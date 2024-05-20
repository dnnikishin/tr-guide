import { BaseEntity } from '../entity/base.entity';

export interface IBaseService<T extends BaseEntity, DTO>  {
  findOne(id: number): Promise<T>;

  findAll(): Promise<T[]>;

  findModifiedAfter(date: Date): Promise<T[]>;

  findAllByIds(ids: number[]): Promise<T[]>;
}
