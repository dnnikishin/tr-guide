import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { LinkEntity } from '../entity/link.entity';

export interface ILinkService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
    
    getLinkById(id: Number): Promise<LinkEntity>;
}