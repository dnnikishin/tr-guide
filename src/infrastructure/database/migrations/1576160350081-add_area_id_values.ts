import { MigrationInterface, QueryRunner } from "typeorm";
import { DatabaseConst } from "../database-const";

const up: string = `
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 1 WHERE address LIKE '%Йошкар-Ола%' OR address LIKE '%Йошкар%Ола%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 2 WHERE address LIKE '%г. Волжск%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 3 WHERE address LIKE '%Козьмодемьянск%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 4 WHERE address LIKE '%Волжский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 5 WHERE address LIKE '%Горномарийский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 6 WHERE address LIKE '%Звениговский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 7 WHERE address LIKE '%Килемарский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 8 WHERE address LIKE '%Куженерский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 9 WHERE address LIKE '%Мари-Турекский район%' OR address LIKE '%Мари-Турек%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 10 WHERE address LIKE '%Медведевский район%' OR address LIKE '%Медведевский р-н%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 11 WHERE address LIKE '%Моркинский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 12 WHERE address LIKE '%Новоторъяльский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 13 WHERE address LIKE '%Оршанский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 14 WHERE address LIKE '%Параньгинский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 15 WHERE address LIKE '%Сернурский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 16 WHERE address LIKE '%Советский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 17 WHERE address LIKE '%Юринский район%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 18 WHERE address LIKE '%Медведево%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 19 WHERE address LIKE '%Звенигово%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 20 WHERE address LIKE '%п. Советский%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 21 WHERE address LIKE '%п. Морки%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 22 WHERE address LIKE '%п. Сернур%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 23 WHERE address LIKE '%Семёновка%' OR address LIKE '%Семеновка%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 24 WHERE address LIKE '%Красногорский%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 25 WHERE address LIKE '%Оршанка%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 26 WHERE address LIKE '%Новый Торъял%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 27 WHERE address LIKE '%Параньга%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 28 WHERE address LIKE '%п. Куженер%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 29 WHERE address LIKE '%п. Мари-Турек%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 30 WHERE address LIKE '%Краснооктябрьский%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 31 WHERE address LIKE '%Килемары%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 32 WHERE address LIKE '%Приволжский%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 33 WHERE address LIKE '%Руэм%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 34 WHERE address LIKE '%Сурок%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 35 WHERE address LIKE '%Юрино%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 36 WHERE address LIKE '%Суслонгер%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 37 WHERE address LIKE '%Знаменский%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 38 WHERE address LIKE '%Шелангер%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 39 WHERE address LIKE '%Силикатный%';
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = 40 WHERE address LIKE '%Помары%';

UPDATE ${DatabaseConst.ROUTES_TABLE} SET area_id = ( 
    SELECT p.area_id
    FROM ${DatabaseConst.PLACES_TABLE} p 
    INNER JOIN ${DatabaseConst.PLACE_ROUTE_TABLE} pr on pr.place_id = p.id
    WHERE pr.route_id = routes.id and pr.order = 1
);
`;

const down: string = `
UPDATE ${DatabaseConst.PLACES_TABLE} SET area_id = null;
UPDATE ${DatabaseConst.ROUTES_TABLE} SET area_id = null;
`;

export class addAreaIdValues1576160350081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(up);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(down);
    }

}
