import { EntityRepository, getRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { MainSectionEntity } from './entity/main-section.entity';

@EntityRepository(MainSectionEntity)
export class MainSectionRepository extends BaseRepository<MainSectionEntity> {

    async getById(id: number): Promise<MainSectionEntity | undefined> {
        return getRepository(MainSectionEntity)
          .createQueryBuilder()
          .where({ id })
          .getOne();
      }
}
