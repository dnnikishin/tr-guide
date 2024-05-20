import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { DatabaseConst } from "../database-const";

export class addAdditionalMaterialTable1578897473304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.ADDITIONAL_MATERIAL_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'varchar' },
                { name: 'ios_file_id', type: 'int', isNullable: false },
                { name: 'android_file_id', type: 'int', isNullable: false },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['ios_file_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['android_file_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
            indices: [
                { columnNames: ['id'] },
            ],
        }), true, true, true);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE} (name, ios_file_id, android_file_id, "createdAt", "updatedAt", "removedAt")
        SELECT ar.name, model.ios_file_id, model.android_file_id, ar."createdAt", ar."updatedAt", ar."removedAt"
        FROM ar
        INNER JOIN (
            SELECT ios.id, ios.ios_id ios_file_id, android.android_id android_file_id
            FROM (
                SELECT ar_id id, file_id ios_id 
                FROM ${DatabaseConst.AR_FILE_TABLE}
                INNER JOIN files ON files.id = ${DatabaseConst.AR_FILE_TABLE}.file_id
                WHERE files.device_type = 'ios') ios
            INNER JOIN (
                SELECT ar_id, file_id android_id 
                FROM ${DatabaseConst.AR_FILE_TABLE}
                INNER JOIN files ON files.id = ${DatabaseConst.AR_FILE_TABLE}.file_id
                WHERE files.device_type = 'android') android ON android.ar_id = ios.id
        ) model ON model.id = ar.id;`);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE} (name, ios_file_id, android_file_id, "createdAt", "updatedAt", "removedAt")
        SELECT ar.name, model.ios_file_id, model.android_file_id, ar."createdAt", ar."updatedAt", ar."removedAt"
        FROM ar
        INNER JOIN (
	        SELECT ios.ar_id, ios.all_type ios_file_id, android.all_type android_file_id
	        FROM (
		        SELECT ar_id, file_id all_type 
		        FROM ${DatabaseConst.AR_FILE_TABLE}
		        INNER JOIN files ON files.id = ${DatabaseConst.AR_FILE_TABLE}.file_id
		        WHERE files.device_type = 'all') AS ios
	        INNER JOIN (
		        SELECT ar_id, file_id all_type 
		        FROM ${DatabaseConst.AR_FILE_TABLE}
		        INNER JOIN files ON files.id = ${DatabaseConst.AR_FILE_TABLE}.file_id
		        WHERE files.device_type = 'all') AS android ON android.ar_id = ios.ar_id
        ) model ON model.ar_id = ar.id;`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.ADDITIONAL_MATERIAL_TABLE, true, true, true);
    }
}
