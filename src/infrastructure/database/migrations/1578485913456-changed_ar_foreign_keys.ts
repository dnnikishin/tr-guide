import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DatabaseConst } from "../database-const";


export class changedArForeignKeys1578485913456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE ${DatabaseConst.AR_FILE_TABLE} RENAME TO _ar;`);

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
                                SELECT _ar.ar_id, _ar.file_id
                                FROM _ar;`);

        await queryRunner.query(`DROP TABLE _ar;`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE ${DatabaseConst.AR_FILE_TABLE} RENAME TO _ar;`);

        await queryRunner.query(`CREATE TABLE IF NOT EXISTS ${DatabaseConst.AR_FILE_TABLE}
                                (
                                    ar_id bigint REFERENCES ar(id),
                                    file_id bigint REFERENCES files (id),
                                    PRIMARY KEY (ar_id, file_id)            
                                 );`);

        await queryRunner.query(`INSERT INTO ${DatabaseConst.AR_FILE_TABLE} (ar_id, file_id)
                                SELECT _ar.ar_id, _ar.file_id
                                FROM _ar;`);

        await queryRunner.query(`DROP TABLE _ar;`);
    }

}
