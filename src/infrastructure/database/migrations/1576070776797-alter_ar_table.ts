import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseConst } from "../database-const";

const up = `
CREATE TABLE IF NOT EXISTS ar_files
(
	ar_id bigint REFERENCES ar(id),
	file_id bigint REFERENCES files (id),
	PRIMARY KEY (ar_id, file_id)
	
);

INSERT INTO ar_files (ar_id, file_id)
SELECT ar.id, ar.id_object
FROM ${DatabaseConst.AR_TABLE};

ALTER TABLE ${DatabaseConst.AR_TABLE}
DROP COLUMN id_object;
`;

const down = `
ALTER TABLE ${DatabaseConst.AR_TABLE} RENAME TO _ar;
CREATE TABLE IF NOT EXISTS ${DatabaseConst.AR_TABLE}
(
    id bigserial PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    id_recognition_image bigint REFERENCES files (id),
    id_object bigint REFERENCES files (id),
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "removedAt" timestamp without time zone
);

INSERT INTO ${DatabaseConst.AR_TABLE} (name, id_recognition_image, id_object, "createdAt", "updatedAt", "removedAt")
SELECT name, id_recognition_image, file_id, "createdAt", "updatedAt", "removedAt"
FROM _ar
INNER JOIN ar_files ON ar_files.ar_id = _ar.id;

DROP TABLE ar_files;
DROP TABLE _ar;
`;

export class alterArTable1576070776797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
