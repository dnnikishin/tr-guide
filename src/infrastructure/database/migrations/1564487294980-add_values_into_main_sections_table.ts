import {MigrationInterface, QueryRunner } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class AddValuesIntoMainSectionsTable1564487294980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into(DatabaseConst.MAIN_SECTIONS_TABLE, ['title'])
            .values([
                { title: 'Заповедный край' },
                { title: 'Марий Эл современная' },
                { title: 'Линии творчества' },
                { title: 'Я здесь' },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner
            .manager
            .createQueryBuilder()
            .delete()
            .from(DatabaseConst.MAIN_SECTIONS_TABLE)
            .where('"title" = :firstCond', { firstCond: 'Заповедный край'})
            .orWhere('"title" = :secondCond', { secondCond: 'Марий Эл современная'})
            .orWhere('"title" = :thirdCond', { thirdCond: 'Линии творчества'})
            .orWhere('"title" = :fourthCond', { fourthCond: 'Я здесь'})
            .execute();
    }

}
