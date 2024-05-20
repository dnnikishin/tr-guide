import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';

export interface ISubSectionService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {}
