import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreateAreasTable1569924837391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.AREAS_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'title', type: 'varchar', isUnique: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
                { name: 'parent_id', type: 'int', isNullable: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['parent_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.AREAS_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.AREAS_TABLE, true, true);
    }

}
