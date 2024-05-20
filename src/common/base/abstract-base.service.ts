import { BaseEntity } from './entity/base.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { NotFoundException } from '@nestjs/common';
import { IBaseService } from './interfaces/ibase.service';
import { MoreThanOrEqual } from 'typeorm';

const OPTIONS: {} = {
  order: {
    id: 'ASC',
  },
};

export abstract class AbstractBaseService<T extends BaseEntity, DTO, R extends BaseRepository<T>>
  implements IBaseService<T, DTO> {

  protected constructor(protected readonly repository: R) {
  }

  findAll(): Promise<T[]> {
    return this.repository.find(OPTIONS);
  }

  findModifiedAfter(date: Date): Promise<T[]> {
    return this.repository.find({
      where: [
        { updated: MoreThanOrEqual(date.toISOString()) },
        { deleted: MoreThanOrEqual(date.toISOString()) },
      ],
    });
  }

  findAllByIds(ids: number[] = []): Promise<T[]> {
    return this.repository.findByIds(ids, OPTIONS);
  }

  async findOne(id: number): Promise<T> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
