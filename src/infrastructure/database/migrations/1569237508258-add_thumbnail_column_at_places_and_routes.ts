import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex} from 'typeorm';
import { DatabaseConst } from '../database-const';

export class AddThumbnailColumnAtPlacesAndRoutes1569237508258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.PLACES_TABLE, new TableColumn({
            name: 'thumbnail_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(DatabaseConst.PLACES_TABLE, new TableForeignKey({
            columnNames: ['thumbnail_id'],
            referencedColumnNames: ['id'],
            referencedTableName: DatabaseConst.FILES_TABLE,
        }));

        await queryRunner.createIndex(DatabaseConst.PLACES_TABLE, new TableIndex({
            columnNames: ['thumbnail_id'],
        }));

        await queryRunner.addColumn(DatabaseConst.ROUTES_TABLE, new TableColumn({
            name: 'thumbnail_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(DatabaseConst.ROUTES_TABLE, new TableForeignKey({
            columnNames: ['thumbnail_id'],
            referencedColumnNames: ['id'],
            referencedTableName: DatabaseConst.FILES_TABLE,
        }));

        await queryRunner.createIndex(DatabaseConst.ROUTES_TABLE, new TableIndex({
            columnNames: ['thumbnail_id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.PLACES_TABLE, 'thumbnail_id');
        await queryRunner.dropColumn(DatabaseConst.ROUTES_TABLE, 'thumbnail_id');
    }

}
