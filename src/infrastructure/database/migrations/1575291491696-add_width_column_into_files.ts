import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import { DatabaseConst } from "../database-const";

export class addWidthColumnIntoFiles1575291491696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.FILES_TABLE, new TableColumn({
            name: 'width',
            type: 'int',
            isNullable: true,
            default: null
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.FILES_TABLE, 'width')
    }

}
