import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { RouteType } from '../../../module/route/route-type';
import { DatabaseConst } from '../database-const';

export class CreateRoutesTable1564479265355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.ROUTES_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'varchar' },
                { name: 'description', type: 'varchar', isNullable: true },
                { name: 'type', type: 'enum', enum: Object.values(RouteType), isNullable: true },
                { name: 'distance', type: 'int', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
        }), true);

        await queryRunner.createTable(new Table({
            name: DatabaseConst.ROUTE_CATEGORY_TABLE,
            columns: [
                { name: 'route_id', type: 'int', isPrimary: true },
                { name: 'category_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['route_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.ROUTES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['category_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.CATEGORIES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
            indices: [
                {
                    columnNames: ['route_id'],
                },
                {
                    columnNames: ['category_id'],
                },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.ROUTE_CATEGORY_TABLE, true, true, true);
        await queryRunner.dropTable(DatabaseConst.ROUTES_TABLE, true);
    }

}
