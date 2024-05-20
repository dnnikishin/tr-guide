import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PlaceEntity } from './entity/place.entity';
import { EntityRepository, getRepository, Brackets, MoreThanOrEqual, getConnection } from 'typeorm';
import { DatabaseConst } from '../../infrastructure/database/database-const';

@EntityRepository(PlaceEntity)
export class PlaceRepository extends BaseRepository<PlaceEntity> {

    async updatePlacesByAmId(amId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.PLACES_TABLE}
            SET "updatedAt" = '${new Date().toISOString()}'
            FROM ${DatabaseConst.PLACE_AM_TABLE}
            WHERE ${DatabaseConst.PLACE_AM_TABLE}.place_id=${DatabaseConst.PLACES_TABLE}.id AND  ${DatabaseConst.PLACE_AM_TABLE}.am_id = ${amId};`,
        );
    }

    async updatePlacesByCategoryId(categoryId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.PLACES_TABLE}
            SET "updatedAt" = '${new Date().toISOString()}'
            FROM ${DatabaseConst.PLACE_CATEGORY_TABLE}
            WHERE ${DatabaseConst.PLACE_CATEGORY_TABLE}.place_id=${DatabaseConst.PLACES_TABLE}.id 
            AND  ${DatabaseConst.PLACE_CATEGORY_TABLE}.category_id = ${categoryId};`,
        );
    }

    async deleteAmFromPlaces(amId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.PLACES_TABLE}
            SET "updatedAt" = '${new Date().toISOString()}'
            FROM ${DatabaseConst.PLACE_AM_TABLE}
            WHERE ${DatabaseConst.PLACE_AM_TABLE}.place_id=${DatabaseConst.PLACES_TABLE}.id AND  ${DatabaseConst.PLACE_AM_TABLE}.am_id = ${amId};`,
        );

        await this.manager.query(`DELETE FROM ${DatabaseConst.PLACE_AM_TABLE} WHERE am_id = ${amId}`);
    }

    async deleteCategoryFromPlaces(categoryId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.PLACES_TABLE}
            SET "updatedAt" = '${new Date().toISOString()}'
            FROM ${DatabaseConst.PLACE_CATEGORY_TABLE}
            WHERE ${DatabaseConst.PLACE_CATEGORY_TABLE}.place_id=${DatabaseConst.PLACES_TABLE}.id 
            AND  ${DatabaseConst.PLACE_CATEGORY_TABLE}.category_id = ${categoryId};`,
        );

        await this.manager.query(`DELETE FROM ${DatabaseConst.PLACE_CATEGORY_TABLE} WHERE category_id = ${categoryId}`);
    }

    public async findModifiedAfter(date: Date): Promise<PlaceEntity[]> {
        const parameter: object = {
            "date": date.toISOString()
        };
        const result: PlaceEntity[] = await getRepository(PlaceEntity)
            .createQueryBuilder('place')
            .leftJoin('place.area', 'area')
            .leftJoinAndSelect('place.thumbnail', 'thumbnail')
            .leftJoinAndSelect('place.categories', 'category')
            .leftJoinAndSelect('place.files', 'file')
            .leftJoinAndSelect('place.additionalMaterials', 'am')
            .where('place.updated >=:date')
            .orWhere(new Brackets(qb => {
                qb.where('place.updated <:date')
                    .andWhere(new Brackets(qbb => {
                        qbb.where('category."updatedAt">=:date')
                            .orWhere('file."updatedAt">=:date')
                        // .orWhere('"am"."updatedAt">=:date')
                    }))
            }))
            .andWhere('category.deleted is null')
            .andWhere('file.deleted is null')
            // .andWhere('am.deleted is null')
            .setParameters(parameter)
            .getMany();
        return result;
    }

    async filterByAreaAndQuery(areaId: number, query: string, regexpQuery: string): Promise<PlaceEntity[]> {
        const parameter = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };


        let sqlQuery = getRepository(PlaceEntity)
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.area', 'area')
            .leftJoinAndSelect('place.thumbnail', 'thumbnail');
        if (areaId !== undefined && query !== undefined) {
            sqlQuery = sqlQuery
                .where("place.name ~* :query")
                .andWhere(new Brackets(qb => {
                    qb.orWhere('area.parent_id=:areaId')
                        .orWhere('area.id=:areaId')
                }))
                .orderBy("similarity(place.name, :text) ", "DESC");
        } else if (areaId !== undefined) {
            sqlQuery = sqlQuery.where(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId')
                    .orWhere('area.id=:areaId');
            }))
        } else if (query !== undefined) {
            sqlQuery = sqlQuery
                .where("place.name ~* :query")
                .orderBy("similarity(place.name, :text) ", "DESC");
        }

        return sqlQuery
            .setParameters(parameter)
            .getMany();
    }

    async paginateWithSearch(page: number, limit: number, query: string, regexpQuery: string, areaId: number): Promise<[PlaceEntity[], number]> {
        const parameter: object = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };
        let sqlQuery = getRepository(PlaceEntity)
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.area', 'area')
            .leftJoinAndSelect('place.thumbnail', 'thumbnail')
            .where('place.deleted is null');

        if (areaId !== undefined) {
            sqlQuery = sqlQuery.andWhere(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId', { areaId })
                    .orWhere('area.id=:areaId', { areaId })
            }));
        }

        if (query !== undefined) {
            sqlQuery = sqlQuery.andWhere("place.name ~* :query")
                .orderBy("similarity(place.name, :text) ", "DESC");
        } else {
            sqlQuery = sqlQuery.orderBy("place.id", "ASC");
        }

        const places: PlaceEntity[] = await sqlQuery
            .setParameters(parameter)
            .getMany();

        const total: number = places.length;

        return [places.splice(page * limit, limit), total];
    }

    private async getTotal(query: string, regexpQuery: string, areaId: number): Promise<number> {
        const parameter: object = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };
        let sqlQuery = getRepository(PlaceEntity)
            .createQueryBuilder('place')
            .leftJoinAndSelect('place.area', 'area')
            .where('place.deleted is null');

        if (areaId !== undefined) {
            sqlQuery = sqlQuery.andWhere(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId', { areaId })
                    .orWhere('area.id=:areaId', { areaId })
            }));
        }

        if (query !== undefined) {
            sqlQuery = sqlQuery.andWhere("place.name ~* :query");
        }

        const places: PlaceEntity[] = await sqlQuery
            .setParameters(parameter)
            .getMany();

        return places.length;
    }
}
