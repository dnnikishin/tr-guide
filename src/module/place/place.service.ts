import { Injectable } from '@nestjs/common';
import { PlaceEntity } from './entity/place.entity';
import { IPlaceService } from './interface/iplace.service';
import { PlaceDTO } from './dto/place.dto';
import { PlaceRepository } from './place.repository';
import { FileService } from '../file/file.service';
import { CategoryService } from '../category/category.service';
import { FileEntity } from '../file/entity/file.entity';
import { CategoryEntity } from '../category/entity/category.entity';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { AreaEntity } from '../area/entity/area.entity';
import { AreaService } from '../area/area.service';
import { RegexpUtility } from '../../common/utility/regexp.utility';
import { PageDTO } from '../../common/base/dto/page.dto';
import { PageDTOFactory } from '../../common/base/factories/page-dto-factory';
import { AdditionalMaterialService } from '../additional-material/am.service';
import { AdditionalMaterialEntity } from '../additional-material/entities/am.entity';

@Injectable()
export class PlaceService
  extends RelationCrudService<PlaceEntity, PlaceDTO, PlaceRepository>
  implements IPlaceService<PlaceEntity, PlaceDTO> {

  constructor(
    protected readonly repository: PlaceRepository,
    private readonly fileService: FileService,
    private readonly categoryService: CategoryService,
    private readonly areaService: AreaService,
    private readonly regexpUtility: RegexpUtility,
    private readonly amService: AdditionalMaterialService
  ) {
    super(repository);
  }

  async convertToEntity(data: PlaceDTO): Promise<PlaceEntity> {
    data.convertToJson();
    const { filesIds, categoriesIds, thumbnailId, areaId, additionalMaterialsIds, ...otherPlaceFields } = data;
    const files: FileEntity[] = await this.fileService.findAllByIds(filesIds);
    const categories: CategoryEntity[] = await this.categoryService.findAllByIds(categoriesIds);
    const thumbnail: FileEntity = await this.fileService.findOne(thumbnailId);
    const area: AreaEntity = await this.areaService.getAreaById(areaId);
    const additionalMaterials: AdditionalMaterialEntity[] = await this.amService.findAllByIds(additionalMaterialsIds);

    return this.repository.create({ ...otherPlaceFields, categories, files, additionalMaterials, thumbnail, area });
  }

  async getPlaces(areaId?: number, query?: string): Promise<PlaceEntity[]> {
    if (areaId === undefined && query === undefined) {
      return this.findAll();
    }
    return this.filterBySearchQueryAndArea(areaId, query);
  }

  private async filterBySearchQueryAndArea(areaId: number, query: string): Promise<PlaceEntity[]> {
    const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
    return await this.repository.filterByAreaAndQuery(areaId, query, regexpQuery);
  }

  async paginate(areaId: number, query: string, page: number, limit: number): Promise<PageDTO> {
    const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
    const [articles, totalCount] = await this.repository.paginateWithSearch(page - 1, limit, query, regexpQuery, areaId);
    return PageDTOFactory.create(page, limit, totalCount, articles);
  }

  public async findModifiedWithModifiedRelationsAfter(date: Date): Promise<PlaceEntity[]> { 
    let modifiedPlaces: PlaceEntity[] = await this.repository.findModifiedAfter(date);
    modifiedPlaces.forEach(p =>{
      p.categoriesIds = p.categories.map(el => el.id);
      p.filesIds = p.files.map(el => el.id);
      //p.additionalMaterialsIds = p.additionalMaterials.map(el => el.id);
    });
    return modifiedPlaces;
  }
}
