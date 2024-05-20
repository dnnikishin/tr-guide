import { Injectable, Inject } from '@nestjs/common';

import { PlaceTags } from '../place/place.tags';
import { IPlaceService } from '../place/interface/iplace.service';
import { PlaceEntity } from '../place/entity/place.entity';
import { PlaceDTO } from '../place/dto/place.dto';
import { RouteTags } from '../route/route.tags';
import { IRouteService } from '../route/interface/iroute.service';
import { RouteEntity } from '../route/entity/route.entity';
import { RouteDTO } from '../route/dto/route.dto';
import { FileTags } from '../file/file.tags';
import { IFileService } from '../file/interface/ifile.service';
import { FileEntity } from '../file/entity/file.entity';
import { CategoryTags } from '../category/category.tags';
import { ICategoryService } from '../category/interface/icategory.service';
import { CategoryEntity } from '../category/entity/category.entity';
import { FileDTO } from '../file/dto/file.dto';
import { CategoryDTO } from '../category/dto/category.dto';
import { DataBundleDTO } from './dto/data-bundle.dto';
import { IDataBundleService } from './interfaces/idata-bundle.service';
import { ISyncService } from './interfaces/isync.service';
import { DataBundleTags } from './data-bundle.tags';
import { ArTags } from '../ar/ar.tags';
import { AREntity } from '../ar/entities/ar.entity';
import { ArDTO } from '../ar/dto/ar.dto';
import { IArService } from '../ar/interface/iar.service';
import { ArDataOutputDTO } from '../ar/dto/ar.data.output.dto';

@Injectable()
export class DataBundleService implements IDataBundleService {
    constructor(
        @Inject(PlaceTags.PLACE_SERVICE) private readonly placeService: IPlaceService<PlaceEntity, PlaceDTO>,
        @Inject(RouteTags.ROUTE_SERVICE) private readonly routeService: IRouteService<RouteEntity, RouteDTO>,
        @Inject(FileTags.FILE_SERVICE) private readonly fileService: IFileService<FileEntity, FileDTO>,
        @Inject(CategoryTags.CATEGORY_SERVICE) private readonly categoryService: ICategoryService<CategoryEntity, CategoryDTO>,
        @Inject(DataBundleTags.SYNC_SERVICE) private readonly syncService: ISyncService,
        @Inject(ArTags.AR_SERVICE) private readonly arService: IArService<AREntity, ArDTO>
    ) { }

    async getBundle(lastUpdate: number, version?: string): Promise<DataBundleDTO> {
        const formatLastUpdate: Date = this.syncService.convertLastUpdate(lastUpdate);

        const places: PlaceEntity[] = await this.placeService.findModifiedAfter(formatLastUpdate);
        const routes: RouteEntity[] = await this.routeService.findModifiedAfter(formatLastUpdate);
        const files: FileEntity[] = await this.fileService.findModifiedAfter(formatLastUpdate);
        const categories: CategoryEntity[] = await this.categoryService.findModifiedAfter(formatLastUpdate);
        const ars: AREntity[] = version !== undefined ? await this.arService.findModifiedAfter(formatLastUpdate) : [];
        const irs: ArDataOutputDTO[] = ars.map(this.arService.convertToDataDto.bind(this.arService));

        return {
            lastUpdate: this.syncService.createLastUpdate(),
            places,
            routes,
            categories,
            files,
            irs
        };
    }
}
