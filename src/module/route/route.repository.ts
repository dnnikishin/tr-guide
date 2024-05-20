import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, getRepository, Brackets } from 'typeorm';
import { RouteEntity } from './entity/route.entity';
import { DatabaseConst } from '../../infrastructure/database/database-const';

@EntityRepository(RouteEntity)
export class RouteRepository extends BaseRepository<RouteEntity> {
    async updateRoutesByCategoryId(categoryId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.ROUTES_TABLE}
        SET "updatedAt" = '${new Date().toISOString()}'
        FROM ${DatabaseConst.ROUTE_CATEGORY_TABLE}
        WHERE ${DatabaseConst.ROUTE_CATEGORY_TABLE}.route_id=${DatabaseConst.ROUTES_TABLE}.id 
        AND  ${DatabaseConst.ROUTE_CATEGORY_TABLE}.category_id = ${categoryId};`,
        );
    }

    async deleteCategoryFromRoute(categoryId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.ROUTES_TABLE}
        SET "updatedAt" = '${new Date().toISOString()}'
        FROM ${DatabaseConst.ROUTE_CATEGORY_TABLE}
        WHERE ${DatabaseConst.ROUTE_CATEGORY_TABLE}.route_id=${DatabaseConst.ROUTES_TABLE}.id 
        AND  ${DatabaseConst.ROUTE_CATEGORY_TABLE}.category_id = ${categoryId};`,
        );

        await this.manager.query(`DELETE FROM ${DatabaseConst.ROUTE_CATEGORY_TABLE} WHERE category_id = ${categoryId}`);
    }

    async findModifiedAfter(date: Date): Promise<RouteEntity[]> {
        const parameter: object = {
            "date": date.toISOString()
        };
        const result: RouteEntity[] = await getRepository(RouteEntity)
            .createQueryBuilder('route')
            .leftJoin('route.area', 'area')
            .leftJoinAndSelect('route.thumbnail', 'thumbnail')
            .leftJoinAndSelect('route.categories', 'category')
            .leftJoinAndSelect('route.placesInRoute', 'placesInRoute')
            .where('route.updated >=:date')
            .orWhere(new Brackets(qb => {
                qb.where('route.updated <:date')
                    .andWhere(new Brackets(qbb => {
                        qbb.where('category."updatedAt">=:date')
                            .orWhere('"placesInRoute"."updatedAt">=:date')
                    }))
            }))
            .andWhere('category.deleted is null')
            .andWhere('placesInRoute.deleted is null')
            .setParameters(parameter)
            .getMany();
        return result;
    }

    async filterByAreaAndQuery(areaId: number, query: string, regexpQuery: string): Promise<RouteEntity[]> {
        const parameter: object = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };

        let sqlQuery = getRepository(RouteEntity)
            .createQueryBuilder('route')
            .leftJoinAndSelect('route.area', 'area')
            .leftJoinAndSelect('route.thumbnail', 'thumbnail');
        if (areaId !== undefined && query !== undefined) {
            sqlQuery = sqlQuery
                .where("route.name ~* :query")
                .andWhere(new Brackets(qb => {
                    qb.orWhere('area.parent_id=:areaId')
                        .orWhere('area.id=:areaId')
                }))
                .orderBy("similarity(route.name, :text) ", "DESC");
        } else if (areaId !== undefined) {
            sqlQuery = sqlQuery.where(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId')
                    .orWhere('area.id=:areaId');
            }))
        } else if (query !== undefined) {
            sqlQuery = sqlQuery
                .where("route.name ~* :query")
                .orderBy("similarity(route.name, :text) ", "DESC");
        }
        return sqlQuery
            .setParameters(parameter)
            .getMany();
    }

    async paginateWithSearch(page: number, limit: number, query: string, regexpQuery: string, areaId: number): Promise<[RouteEntity[], number]> {
        const parameter: object = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };
        let sqlQuery = getRepository(RouteEntity)
            .createQueryBuilder('route')
            .leftJoinAndSelect('route.area', 'area')
            .leftJoinAndSelect('route.thumbnail', 'thumbnail')
            .where('route.deleted is null');

        if (areaId !== undefined) {
            sqlQuery = sqlQuery.andWhere(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId', { areaId })
                    .orWhere('area.id=:areaId', { areaId })
            }));
        }

        if (query !== undefined) {
            sqlQuery = sqlQuery.andWhere("route.name ~* :query")
                .orderBy("similarity(route.name, :text) ", "DESC");
        } else {
            sqlQuery = sqlQuery.orderBy("route.id", "ASC");
        }

        const routes: RouteEntity[] = await sqlQuery
            .setParameters(parameter)
            .getMany();
        const total: number = routes.length;

        return [routes.splice(page * limit, limit), total];
    }

    private async getTotal(query: string, regexpQuery: string, areaId: number): Promise<number> {
        const parameter: object = {
            "query": regexpQuery,
            "text": query,
            "areaId": areaId
        };
        let sqlQuery = getRepository(RouteEntity)
            .createQueryBuilder('route')
            .leftJoinAndSelect('route.area', 'area')
            .where('route.deleted is null');

        if (areaId !== undefined) {
            sqlQuery = sqlQuery.andWhere(new Brackets(qb => {
                qb.orWhere('area.parent_id=:areaId', { areaId })
                    .orWhere('area.id=:areaId', { areaId })
            }));
        }

        if (query !== undefined) {
            sqlQuery = sqlQuery.andWhere("route.name ~* :query");
        }

        const routes: RouteEntity[] = await sqlQuery
            .setParameters(parameter)
            .getMany();

        return routes.length;
    }
}
