import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { DatabaseConst } from "../database-const";

export class createTableNewsFile1579610779757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.NEW_FILE_TABLE,
            columns: [
                { name: 'news_id', type: 'int', isPrimary: true },
                { name: 'file_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['news_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.NEWS_TABLE,
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
                { columnNames: ['news_id', 'file_id'] },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.NEW_FILE_TABLE, true, true, true);
    }

}
