import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';
import { DatabaseConst } from '../database-const';

export class DropOriginalNameColumnInFilesTable1569334629567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.FILES_TABLE, 'original_name');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.FILES_TABLE, new TableColumn({
            name: 'original_name',
            type: 'text',
            isNullable: true,
        }));
    }

}
