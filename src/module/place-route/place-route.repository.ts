import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, getManager } from 'typeorm';
import { PlaceRouteEntity } from './entity/place-route.entity';
import { async } from 'rxjs/internal/scheduler/async';

@EntityRepository(PlaceRouteEntity)
export class PlaceRouteRepository extends BaseRepository<PlaceRouteEntity> {
    async getPlaceByRoute(routeId: number): Promise<PlaceRouteEntity[]> {
        return getManager()
        .createQueryBuilder(PlaceRouteEntity, "placeRoute")
        .leftJoin("placeRoute.route", "route")
        .where("route.id = :routeId", {routeId})
        .orderBy("placeRoute.order", "ASC")
        .getMany();
    }

    async getPlaceByRouteAndOrder(routeId: number, order: number): Promise<boolean> {
        const places: PlaceRouteEntity[] = await getManager()
        .createQueryBuilder(PlaceRouteEntity, "placeRoute")
        .leftJoin("placeRoute.route", "route")
        .where("route.id = :routeId", {routeId})
        .andWhere("placeRoute.order = :order", {order})
        .andWhere("placeRoute.deleted is null")
        .getMany();

        return places.length === 0;
    }
}
