import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { PageDTO } from '../../../common/base/dto/page.dto';

export interface IPlaceService<T extends BaseEntity, DTO> extends ICrudService<T, DTO>{
    getPlaces(areaId?: number,  query?: string): Promise<T[]>;
    paginate(areaId: number, query: string, page: number, limit: number): Promise<PageDTO>;
    findModifiedWithModifiedRelationsAfter(date: Date): Promise<T[]>
}
