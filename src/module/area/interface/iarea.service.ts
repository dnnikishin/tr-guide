import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';

export interface IAreaService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
    getAreaById(id: number): Promise<T | undefined>;
}
