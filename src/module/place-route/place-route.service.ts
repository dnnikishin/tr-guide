import { Injectable, BadRequestException } from '@nestjs/common';
import { IPlaceRouteService } from './interface/iplace-route.service';
import { PlaceRouteEntity } from './entity/place-route.entity';
import { PlaceRouteDTO } from './dto/place-route.dto';
import { PlaceRouteRepository } from './place-route.repository';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { RouteEntity } from '../route/entity/route.entity';
import { RouteService } from '../route/route.service';
import { PlaceService } from '../place/place.service';
import { PlaceEntity } from '../place/entity/place.entity';

@Injectable()
export class PlaceRouteService
  extends RelationCrudService<PlaceRouteEntity, PlaceRouteDTO, PlaceRouteRepository>
  implements IPlaceRouteService<PlaceRouteEntity, PlaceRouteDTO> {

  constructor(
    protected readonly repository: PlaceRouteRepository,
    private readonly routeService: RouteService,
    private readonly placeService: PlaceService
  ) {
    super(repository);
  }

  async checkAndCreate(data: PlaceRouteDTO): Promise<PlaceRouteEntity> {
    const isExists: boolean = await this.repository.getPlaceByRouteAndOrder(data.routeId, data.order);
    if(isExists) {
      return this.create(data);
    } else {
      throw new BadRequestException('', 'Order invalid value, in this route place with that order already exists');
    }
  }

  async convertToEntity(data: PlaceRouteDTO): Promise<PlaceRouteEntity> {
    const { placeId, routeId, ...otherPlaceFields } = data;
    const route: RouteEntity = await this.routeService.findOne(routeId);
    const place: PlaceEntity = await this.placeService.findOne(placeId);
    return this.repository.create({ ...otherPlaceFields, route, place });
  }

  async getPlaces(routeId?: number): Promise<PlaceRouteEntity[]> {
    return (routeId !== undefined) ? this.filterByRoute(routeId) : this.findAll();
  }

  private async filterByRoute(routeId: number): Promise<PlaceRouteEntity[]> {
    return this.repository.getPlaceByRoute(routeId);
  }
}
