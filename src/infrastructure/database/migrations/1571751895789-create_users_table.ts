import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreateUsersTable1571751895789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.USERS_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'username', type: 'varchar', isUnique: true },
                { name: 'password', type: 'varchar' },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.USERS_TABLE);
    }

}
