import { ICrudService } from './interfaces/icrud.service';
import { BaseEntity } from './entity/base.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { BadRequestException } from '@nestjs/common';
import { AbstractBaseService } from './abstract-base.service';

export abstract class NonRelationCrudService<T extends BaseEntity, DTO, R extends BaseRepository<T>>
  extends AbstractBaseService<T, DTO, R> implements ICrudService<T, DTO> {
  protected constructor(protected readonly repository: R) {
    super(repository);
  }

  async create(data: DTO): Promise<T> {
    try {
      const candidate: any = this.repository.create(data);
      const insertResult: InsertResult = await this.repository.insert(candidate);
      const { id } = insertResult.raw[0];
      return this.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.repository.update(id, { deleted: new Date(), updated: new Date() } as any);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(id: number, data: DTO): Promise<T> {
    try {
      Object.assign(data, {updated: new Date()});
      await this.repository.update(id, data);
      return this.findOne(id);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
