import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreateArticleFileTable1567595717272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.ARTICLE_FILE_TABLE,
            columns: [
                { name: 'article_id', type: 'int', isPrimary: true },
                { name: 'file_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['article_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.ARTICLES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['file_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
            indices: [
                { columnNames: ['article_id', 'file_id'] },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.ARTICLE_FILE_TABLE, true, true, true);
    }

}
