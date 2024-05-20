import { MigrationInterface, QueryRunner } from 'typeorm';
import { DatabaseConst } from '../database-const';

const up: string = `
    INSERT INTO ${DatabaseConst.SUBSECTIONS_TABLE} ("title", "main_section_id")
    VALUES ('Места', 4),
        ('Маршруты', 4),
        ('Новости', 4);
`;

const down: string = `
    DELETE FROM ${DatabaseConst.SUBSECTIONS_TABLE}
    WHERE "main_section_id"=4;
`;

export class AddValuesIntoIAmHereSubsection1566895040822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
