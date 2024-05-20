import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreateCategoryTable1564468396354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.CATEGORIES_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'varchar', isUnique: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('categories_test', true);
    }

}
