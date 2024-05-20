import {MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DatabaseConst } from '../database-const';

export class CreatePlacesTables1564475346205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: DatabaseConst.PLACES_TABLE,
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'name', type: 'varchar' },
                { name: 'latitude', type: 'double precision', isNullable: true },
                { name: 'longitude', type: 'int', isNullable: true },
                { name: 'altitude', type: 'double precision', default: 0 },
                { name: 'description', type: 'varchar', isNullable: true },
                { name: 'address', type: 'varchar', isNullable: true },
                { name: 'phones', type: 'jsonb', isNullable: true },
                { name: 'site', type: 'varchar', isNullable: true },
                { name: 'schedule', type: 'jsonb', isNullable: true },
                { name: 'email', type: 'text', isNullable: true },
                { name: 'price', type: 'varchar', isNullable: true },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()'},
                { name: 'removedAt', type: 'timestamp', default: null, isNullable: true },
            ],
        }), true);

        await queryRunner.createTable(new Table({
            name: DatabaseConst.PLACE_CATEGORY_TABLE,
            columns: [
                { name: 'place_id', type: 'int', isPrimary: true },
                { name: 'category_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['place_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.PLACES_TABLE,
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
                { columnNames: ['place_id'] },
                { columnNames: ['category_id'] },
            ],
        }), true, true, true);

        await queryRunner.createTable(new Table({
            name: DatabaseConst.PLACE_FILE_TABLE,
            columns: [
                { name: 'place_id', type: 'int', isPrimary: true },
                { name: 'file_id', type: 'int', isPrimary: true },
            ],
            foreignKeys: [
                {
                    columnNames: ['place_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.PLACES_TABLE,
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['file_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: DatabaseConst.FILES_TABLE,
                    onDelete: 'CASCADE',
                },
            ],
            indices: [
                { columnNames: ['place_id'] },
                { columnNames: ['file_id'] },
            ],
        }), true, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(DatabaseConst.PLACE_FILE_TABLE, true, true, true);
        await queryRunner.dropTable(DatabaseConst.PLACE_CATEGORY_TABLE, true, true, true);
        await queryRunner.dropTable(DatabaseConst.PLACES_TABLE, true);
    }

}
