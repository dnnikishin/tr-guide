import { BaseRepository, Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoryEntity } from './entity/category.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {

    @Transactional()
    public async deleteCategory(id: number): Promise<void> {
        await this.update(id, {
            deleted: new Date(),
            updated: new Date(),
            name: 'deleted' + new Date().toString()
        } as any);
    }
}
