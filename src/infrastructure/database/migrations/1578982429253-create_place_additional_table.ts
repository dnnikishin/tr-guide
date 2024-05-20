import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { DatabaseConst } from "../database-const";

export class createPlaceAdditionalTable1578982429253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.PLACE_AM_TABLE,
            columns: [
                { name: 'place_id', type: 'int', isPrimary: true },
                { name: 'am_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['place_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.PLACES_TABLE,
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
                { columnNames: ['place_id'] },
                { columnNames: ['am_id'] },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.PLACE_FILE_TABLE, true, true, true);
    }

}
