import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DatabaseConst } from "../database-const";

export class alterArTableChangedDependencies1578903165977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.AR_AM_TABLE,
            columns: [
                { name: 'ar_id', type: 'int', isPrimary: true },
                { name: 'am_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['ar_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.AR_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['am_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.ADDITIONAL_MATERIAL_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
            indices: [
                { columnNames: ['ar_id', 'am_id'] },
            ],
        }), true, true, true);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.AR_AM_TABLE} (ar_id, am_id) 
        SELECT ${DatabaseConst.AR_FILE_TABLE}.ar_id, ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.id 
        FROM ${DatabaseConst.AR_FILE_TABLE} 
        INNER JOIN ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE} ON ${DatabaseConst.AR_FILE_TABLE}.file_id = ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.ios_file_id;
        `);

        await queryRunner.dropTable(DatabaseConst.AR_FILE_TABLE, true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.AR_FILE_TABLE,
            columns: [
                { name: 'ar_id', type: 'int', isPrimary: true },
                { name: 'file_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['ar_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.AR_TABLE,
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
                { columnNames: ['ar_id', 'file_id'] },
            ],
        }), true, true, true);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.AR_FILE_TABLE} (ar_id, file_id) 
        SELECT ${DatabaseConst.AR_AM_TABLE}.ar_id, ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.ios_file_id
        FROM ${DatabaseConst.AR_AM_TABLE}
        INNER JOIN ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE} ON ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.id = ${DatabaseConst.AR_AM_TABLE}.am_id
        `);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.AR_FILE_TABLE} (ar_id, file_id) 
        SELECT ${DatabaseConst.AR_AM_TABLE}.ar_id, ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.android_file_id
        FROM ${DatabaseConst.AR_AM_TABLE}
        INNER JOIN ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE} ON ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.id = ${DatabaseConst.AR_AM_TABLE}.am_id
        INNER JOIN ${DatabaseConst.FILES_TABLE} ON ${DatabaseConst.FILES_TABLE}.id = ${DatabaseConst.ADDITIONAL_MATERIAL_TABLE}.android_file_id
        WHERE ${DatabaseConst.FILES_TABLE}.device_type = 'android';
        `);

        await queryRunner.dropTable(DatabaseConst.AR_AM_TABLE, true, true, true);
    }

}
