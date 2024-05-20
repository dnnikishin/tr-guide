import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class AddAreaIdAtPlaceAndRouteTables1569924892364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.PLACES_TABLE, new TableColumn({
            name: 'area_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(DatabaseConst.PLACES_TABLE, new TableForeignKey({
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: DatabaseConst.AREAS_TABLE,
        }));

        await queryRunner.addColumn(DatabaseConst.ROUTES_TABLE, new TableColumn({
            name: 'area_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(DatabaseConst.ROUTES_TABLE, new TableForeignKey({
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: DatabaseConst.AREAS_TABLE,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.PLACES_TABLE, 'area_id');
        await queryRunner.dropColumn(DatabaseConst.ROUTES_TABLE, 'area_id');
    }

}
