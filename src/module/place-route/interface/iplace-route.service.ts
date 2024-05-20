import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { PlaceRouteEntity } from '../entity/place-route.entity';
import { PlaceRouteDTO } from '../dto/place-route.dto';

export interface IPlaceRouteService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
    getPlaces(routeId?: number): Promise<PlaceRouteEntity[]>;

    checkAndCreate(data: PlaceRouteDTO): Promise<PlaceRouteEntity>;
}
