import { AREntity } from './entities/ar.entity';
import { EntityRepository, getConnection, getRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { FileEntity } from '../file/entity/file.entity';
import { LinkEntity } from '../link/entity/link.entity';
import { DatabaseConst } from '../../infrastructure/database/database-const';

@EntityRepository(AREntity)
export class ArRepository extends BaseRepository<AREntity> {
    async updateAr(id: number, name: string, recognitionImage: FileEntity, link: LinkEntity, deletedObjectsId: number[], addedObjectsId: number[]): Promise<void> {

        await getConnection()
            .createQueryBuilder()
            .update(AREntity)
            .set({ name: name, recognitionImage: recognitionImage, link: link })
            .where('id = :id', { id })
            .execute();

        await getConnection()
            .createQueryBuilder()
            .relation(AREntity, 'ams')
            .of(id)
            .addAndRemove(addedObjectsId, deletedObjectsId);
    }

    async updateArsByAmId(amId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.AR_TABLE} 
            SET "updatedAt" = '${new Date().toISOString()}' 
            FROM ${DatabaseConst.AR_AM_TABLE} 
            WHERE ${DatabaseConst.AR_AM_TABLE}.ar_id=${DatabaseConst.AR_TABLE}.id AND  ${DatabaseConst.AR_AM_TABLE}.am_id = ${amId};`,
        );
    }

    async deleteAmFromArs(amId: number): Promise<void> {
        await this.manager.query(
            `UPDATE ${DatabaseConst.AR_TABLE} 
            SET "updatedAt" = '${new Date().toISOString()}' 
            FROM ${DatabaseConst.AR_AM_TABLE} 
            WHERE ${DatabaseConst.AR_AM_TABLE}.ar_id=${DatabaseConst.AR_TABLE}.id AND  ${DatabaseConst.AR_AM_TABLE}.am_id = ${amId};`,
        );

        await this.manager.query(`DELETE FROM ${DatabaseConst.AR_AM_TABLE} WHERE am_id = ${amId}`);
    }
}
