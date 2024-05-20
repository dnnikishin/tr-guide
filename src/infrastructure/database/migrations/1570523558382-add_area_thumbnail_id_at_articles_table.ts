import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class AddAreaThumbnailIdAtArticlesTable1570523558382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.ARTICLES_TABLE, new TableColumn({
            name: 'thumbnail_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.createForeignKey(DatabaseConst.ARTICLES_TABLE, new TableForeignKey({
            columnNames: ['thumbnail_id'],
            referencedColumnNames: ['id'],
            referencedTableName: DatabaseConst.FILES_TABLE,
        }));

        await queryRunner.createIndex(DatabaseConst.ARTICLES_TABLE, new TableIndex({
            columnNames: ['thumbnail_id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.ARTICLES_TABLE, 'thumbnail_id');
    }

}
