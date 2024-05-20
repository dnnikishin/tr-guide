import { MigrationInterface, QueryRunner } from 'typeorm';
import { DatabaseConst } from '../database-const';

const up = `ALTER TABLE ${DatabaseConst.PLACES_TABLE} ALTER COLUMN longitude TYPE double precision`;

const down = `ALTER TABLE ${DatabaseConst.PLACES_TABLE} ALTER COLUMN longitude TYPE integer`;

export class ChangeLongitudeFieldPlacesTable1568879377471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query(down);
    }

}
