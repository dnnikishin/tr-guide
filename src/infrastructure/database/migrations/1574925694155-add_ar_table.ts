import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DatabaseConst } from "../database-const";

export class addArTable1574925694155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.AR_TABLE,
            columns: [
                { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'text' },
                { name: 'id_recognition_image', type: 'bigint', isNullable: true },
                { name: 'id_object', type: 'bigint', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true }
            ],
            foreignKeys: [
                {
                    columnNames: ['id_recognition_image'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['id_object'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.AR_TABLE, true, true);
    }

}
