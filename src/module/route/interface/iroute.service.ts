import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { PageDTO } from '../../../common/base/dto/page.dto';

export interface IRouteService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
   getRoutes(areaId?: number, query?: string): Promise<T[]>;
   paginate(areaId: number, query: string, page: number, limit: number): Promise<PageDTO>;
   findModifiedWithModifiedRelationsAfter(date: Date): Promise<T[]>;
}
