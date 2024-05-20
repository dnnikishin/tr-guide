import {MigrationInterface, QueryRunner} from 'typeorm';
import { DatabaseConst } from '../database-const';

const up: string = `
    INSERT INTO ${DatabaseConst.SUBSECTIONS_TABLE} ("title", "main_section_id")
    VALUES ('Кухня', 1),
        ('Обычаи и традиции', 1),
        ('Население', 1),
        ('География', 1),
        ('Инфраструктура', 2),
        ('Правительство', 2),
        ('Предприятия', 2),
        ('Культура и отдых', 2),
        ('Спорт', 2),
        ('Ремесла', 3),
        ('Искусство', 3),
        ('Быт', 3);
`;

const down: string = `
    DELETE FROM ${DatabaseConst.SUBSECTIONS_TABLE}
    WHERE "main_section_id"=1 OR
    "main_section_id"=2 OR
    "main_section_id"=3 OR
    "main_section_id"=4;
`;

export class AddValuesIntoSubsectionsTable1564569904817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
