import { BaseEntity } from '../entity/base.entity';
import { IBaseService } from './ibase.service';

export interface ICrudService<T extends BaseEntity, DTO> extends IBaseService<T, DTO> {

  remove(id: number): Promise<void>;

  create(data: DTO): Promise<T>;

  update(id: number, data: DTO): Promise<T>;

}
