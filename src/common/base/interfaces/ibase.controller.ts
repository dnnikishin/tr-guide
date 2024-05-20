import { BaseEntity } from '../entity/base.entity';

export interface IBaseController<T extends BaseEntity, DTO> {

  findOne(id: number): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: number): Promise<void> ;

  create(data: DTO): Promise<T>;

  update(id: number, data: DTO): Promise<T> ;
}
