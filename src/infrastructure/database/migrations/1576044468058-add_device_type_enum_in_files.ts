import {MigrationInterface, QueryRunner} from "typeorm";
import { DatabaseConst } from '../database-const';

const up = `
    CREATE TYPE device_type_enum as enum('ios', 'android', 'all');
    ALTER TABLE IF EXISTS ${DatabaseConst.FILES_TABLE}
    ADD COLUMN IF NOT EXISTS device_type device_type_enum NOT NULL DEFAULT 'all';
`;

const down = `
    ALTER TABLE IF EXISTS ${DatabaseConst.FILES_TABLE}
    DROP COLUMN IF EXISTS device_type;
    DROP TYPE device_type_enum;
`;


export class addDeviceTypeEnumInFiles1576044468058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
