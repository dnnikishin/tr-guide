import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreatePlaceRouteTable1564479958509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.PLACE_ROUTE_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'description', type: 'varchar', isNullable: true },
                { name: 'order', type: 'int' },
                { name: 'time', type: 'int', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
                { name: 'place_id', type: 'int' },
                { name: 'route_id', type: 'int' },
            ],
            foreignKeys: [
                {
                    columnNames: ['place_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.PLACES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['route_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.ROUTES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.PLACE_ROUTE_TABLE, true, true);
    }

}
