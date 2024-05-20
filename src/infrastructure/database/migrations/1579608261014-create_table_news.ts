import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DatabaseConst } from '../database-const';

export class createTableNews1579608261014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.NEWS_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'title', type: 'varchar' },
                { name: 'text', type: 'text', isNullable: true },
                { name: 'thumbnail_id', type: 'int', isNullable: true, },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true }
            ],
            foreignKeys: [
                {
                    columnNames: ['thumbnail_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                }
            ],
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.NEWS_TABLE, true, true);
    }

}
