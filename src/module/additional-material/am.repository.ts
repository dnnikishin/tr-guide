import { AdditionalMaterialEntity } from './entities/am.entity';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AdditionalMaterialEntity)
export class AdditionalMaterialRepository extends BaseRepository<AdditionalMaterialEntity> {

}
