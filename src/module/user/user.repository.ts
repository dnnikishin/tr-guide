import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { UserEntity } from './entities/user.entity';
import { EntityRepository, getRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return getRepository(UserEntity)
            .createQueryBuilder()
            .where({username})
            .getOne();
    }
}
