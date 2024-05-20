import { EntityRepository, getManager, getRepository } from 'typeorm';
import { AreaEntity } from './entity/area.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(AreaEntity)
export class AreaRepository extends BaseRepository<AreaEntity> {
    async findAreaById(id: number): Promise<AreaEntity | undefined> {
        return getRepository(AreaEntity)
            .createQueryBuilder()
            .select()
            .where({ id })
            .getOne();
    }

    async getAllAreas(): Promise<AreaEntity[]> {
        return getManager()
            .getTreeRepository(AreaEntity)
            .findTrees();
    }

    async findByIds(ids: number[]): Promise<AreaEntity[]> {
        return getRepository(AreaEntity)
            .findByIds(ids);
    }
}
