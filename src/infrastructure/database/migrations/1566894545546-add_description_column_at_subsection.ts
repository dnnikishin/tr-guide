import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class AddDescriptionColumnAtSubsection1566894545546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(DatabaseConst.SUBSECTIONS_TABLE, new TableColumn({
            name: 'description',
            type: 'text',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn(DatabaseConst.SUBSECTIONS_TABLE, 'description');
    }

}
