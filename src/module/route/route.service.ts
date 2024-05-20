import { Injectable } from '@nestjs/common';
import { IRouteService } from './interface/iroute.service';
import { RouteEntity } from './entity/route.entity';
import { RouteDTO } from './dto/route.dto';
import { RouteRepository } from './route.repository';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entity/category.entity';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { FileEntity } from '../file/entity/file.entity';
import { FileService } from '../file/file.service';
import { AreaEntity } from '../area/entity/area.entity';
import { AreaService } from '../area/area.service';
import { RegexpUtility } from '../../common/utility/regexp.utility';
import e = require('express');
import { PageDTO } from '../../common/base/dto/page.dto';
import { PageDTOFactory } from '../../common/base/factories/page-dto-factory';

@Injectable()
export class RouteService
  extends RelationCrudService<RouteEntity, RouteDTO, RouteRepository>
  implements IRouteService<RouteEntity, RouteDTO> {

  constructor(
    protected readonly repository: RouteRepository,
    private readonly categoryService: CategoryService,
    private readonly fileService: FileService,
    private readonly areaService: AreaService,
    private readonly regexpUtility: RegexpUtility
  ) {
    super(repository);
  }

  async convertToEntity(data: RouteDTO): Promise<RouteEntity> {
    const { categoriesIds, thumbnailId, areaId, ...otherRouteFields } = data;
    const categories: CategoryEntity[] = await this.categoryService.findAllByIds(categoriesIds);
    const thumbnail: FileEntity = await this.fileService.findOne(thumbnailId);
    const area: AreaEntity = await this.areaService.getAreaById(areaId);
    return this.repository.create({ ...otherRouteFields, categories, thumbnail, area });
  }

  async getRoutes(areaId?: number, query?: string): Promise<RouteEntity[]> {
    if (areaId === undefined && query === undefined) {
      return this.findAll();
    }
    return this.filterBySearchQueryAndArea(areaId, query);
  }

  private async filterBySearchQueryAndArea(areaId: number, query: string): Promise<RouteEntity[]> {
    const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
    return await this.repository.filterByAreaAndQuery(areaId, query, regexpQuery);
  }

  async paginate(areaId: number, query: string, page: number, limit: number): Promise<PageDTO> {
    const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
    const [articles, totalCount] = await this.repository.paginateWithSearch(page - 1, limit, query, regexpQuery, areaId);
    return PageDTOFactory.create(page, limit, totalCount, articles);
  }

  public async findModifiedWithModifiedRelationsAfter(date: Date): Promise<RouteEntity[]> {
    let modifiedRotes: RouteEntity[] = await this.repository.findModifiedAfter(date);
    modifiedRotes.forEach(r => {
      r.categoriesIds = r.categories.map(el => el.id);
    });
    return modifiedRotes;
  }
}
