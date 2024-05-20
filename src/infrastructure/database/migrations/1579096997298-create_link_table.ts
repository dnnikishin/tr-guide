import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { DatabaseConst } from "../database-const";

export class createLinkTable1579096997298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.LINK_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'varchar' },
                { name: 'url', type: 'text', isNullable: false },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
            indices: [
                { columnNames: ['id'] },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.LINK_TABLE, true, true, true);
    }

}
