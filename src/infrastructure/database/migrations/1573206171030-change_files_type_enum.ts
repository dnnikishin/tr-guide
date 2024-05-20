import { MigrationInterface, QueryRunner } from 'typeorm';
import { DatabaseConst } from '../database-const';

const up = `
    ALTER TYPE files_type_enum RENAME TO _files_type_enum;
    CREATE TYPE files_type_enum as enum('image', 'video', 'audio', 'historical_photo', '3d_model', 'others');
    ALTER TABLE ${DatabaseConst.FILES_TABLE}
    ALTER COLUMN type TYPE files_type_enum USING type::text::files_type_enum;
    DROP TYPE _files_type_enum;
`;

const down = `
    UPDATE ${DatabaseConst.FILES_TABLE}
    SET type='others'
    WHERE type='audio' OR type='historical_photo' OR type='3d_model';

    ALTER TYPE files_type_enum RENAME TO _files_type_enum;
    CREATE TYPE files_type_enum as enum('image', 'video', 'document', 'others');
    ALTER TABLE ${DatabaseConst.FILES_TABLE}
    ALTER COLUMN type TYPE files_type_enum USING type::text::files_type_enum;
    DROP TYPE _files_type_enum;
`;

export class ChangeFilesTypeEnum1573206171030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
