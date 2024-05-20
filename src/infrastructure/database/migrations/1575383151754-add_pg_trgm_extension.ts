import {MigrationInterface, QueryRunner} from "typeorm";

const up = `
CREATE EXTENSION IF NOT EXISTS pg_trgm;
`;

const down = `
DROP EXTENSION IF EXISTS pg_trgm;
`;


export class addPgTrgmExtension1575383151754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}

