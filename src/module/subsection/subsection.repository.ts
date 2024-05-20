import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { SubSectionEntity } from './entity/subsection.entity';

@EntityRepository(SubSectionEntity)
export class SubSectionRepository extends BaseRepository<SubSectionEntity> {}
