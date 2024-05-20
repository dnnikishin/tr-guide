import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreateArticlesTable1564485714732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.ARTICLES_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'title', type: 'varchar' },
                { name: 'text', type: 'text', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
                { name: 'main_section_id', type: 'int' },
                { name: 'subsection_id', type: 'int' },
            ],
            foreignKeys: [
                {
                    columnNames: ['main_section_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.MAIN_SECTIONS_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['subsection_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.SUBSECTIONS_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.ARTICLES_TABLE, true, true);
    }

}
