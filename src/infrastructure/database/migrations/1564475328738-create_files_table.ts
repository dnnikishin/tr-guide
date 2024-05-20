import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { FileType } from '../../../module/file/file-type';
import { DatabaseConst } from '../database-const';

export class СreateFilesTable1564475328738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.FILES_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'original_name', type: 'text' },
                { name: 'mimetype', type: 'varchar' },
                { name: 'url', type: 'jsonb' },
                { name: 'size', type: 'jsonb', isNullable: true },
                { name: 'type', type: 'enum', enum: Object.values(FileType) },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.FILES_TABLE, true);
    }

}
