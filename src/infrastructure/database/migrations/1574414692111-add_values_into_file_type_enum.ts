import {MigrationInterface, QueryRunner} from "typeorm";
import { DatabaseConst } from '../database-const';

const up = `
    ALTER TYPE files_type_enum RENAME TO _files_type_enum;
    CREATE TYPE files_type_enum as enum('image', 'video', 'audio', 'historical_photo', '3d_model',  'recognition_image',  '360_degree_photo', 'others');
    ALTER TABLE ${DatabaseConst.FILES_TABLE}
    ALTER COLUMN type TYPE files_type_enum USING type::text::files_type_enum;
    DROP TYPE _files_type_enum;
`;

const down = `
    UPDATE ${DatabaseConst.FILES_TABLE}
    SET type='image'
    WHERE type='recognition_image' OR type='360_degree_photo';

    ALTER TYPE files_type_enum RENAME TO _files_type_enum;
    CREATE TYPE files_type_enum as enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'others');
    ALTER TABLE ${DatabaseConst.FILES_TABLE}
    ALTER COLUMN type TYPE files_type_enum USING type::text::files_type_enum;
    DROP TYPE _files_type_enum;
`;


export class addValuesIntoFileTypeEnum1574414692111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
