import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { CategoryDTO } from './dto/category.dto';
import { CategoryRepository } from './category.repository';
import { NonRelationCrudService } from '../../common/base/non-relation-crud.service';
import { ICategoryService } from './interface/icategory.service';
import { PlaceRepository } from '../place/place.repository';
import { RouteRepository } from '../route/route.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class CategoryService
  extends NonRelationCrudService<CategoryEntity, CategoryDTO, CategoryRepository>
  implements ICategoryService<CategoryEntity, CategoryDTO> {

  constructor(
    readonly repository: CategoryRepository,
    private readonly placeRepository: PlaceRepository,
    private readonly routeRepository: RouteRepository,
  ) {
    super(repository);
  }

  @Transactional()
  public async update(id: number, data: CategoryDTO): Promise<CategoryEntity> {
    Object.assign(data, { updated: new Date() });
    await this.repository.update(id, data);
    await this.placeRepository.updatePlacesByCategoryId(id);
    await this.routeRepository.updateRoutesByCategoryId(id);
    return this.findOne(id);
  }

  @Transactional()
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.deleteCategory(id);
    await this.placeRepository.deleteCategoryFromPlaces(id);
    await this.routeRepository.deleteCategoryFromRoute(id);

  }
}
