import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AbstractBaseService } from './abstract-base.service';
import { ICrudService } from './interfaces/icrud.service';
import { BaseEntity } from './entity/base.entity';
import { BadRequestException } from '@nestjs/common';
import { DeepPartial } from 'typeorm';

export abstract class RelationCrudService<T extends BaseEntity, DTO, R extends BaseRepository<T>>
  extends AbstractBaseService<T, DTO, R>
  implements ICrudService<T, DTO> {

  protected constructor(protected readonly repository: R) {
    super(repository);
  }

  async create(data: DTO): Promise<T> {
    try {
      const candidate = await this.convertToEntity(data);
      const entity: T = await this.repository.save(candidate);
      const { id } = entity;
      return this.repository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.repository.update(id, { deleted: new Date(),  updated: new Date()} as any);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(id: number, data: DTO): Promise<T> {
    try {
      const entityFromDb = await this.findOne(id);
      const entityFromRequest = await this.convertToEntity(data);
      Object.assign(entityFromRequest, {updated: new Date()});
      const candidate = { ...entityFromDb, ...entityFromRequest };
      await this.repository.save(candidate);
      return this.findOne(id);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  abstract async convertToEntity(data: DTO): Promise<DeepPartial<T>>;
}
