import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { UserEntity } from '../entities/user.entity';

export interface IUserService<T extends BaseEntity, DTO> extends ICrudService<T, DTO>  {
    findByUsername(username: string): Promise<UserEntity | undefined>;
}
