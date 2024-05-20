import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import { DatabaseConst } from "../database-const";

export class alterArTableAddLink1579099014860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.AR_TABLE, new TableColumn({
            name: "link_id", 
            type: "int",
            isNullable: true 
        }));

        await queryRunner.createForeignKey(DatabaseConst.AR_TABLE, new TableForeignKey({
            columnNames: ["link_id"],
            referencedColumnNames: ["id"],
            referencedTableName: DatabaseConst.LINK_TABLE,
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.AR_TABLE, "link_id");
    }
}
