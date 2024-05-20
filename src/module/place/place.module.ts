import { Module, Provider } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRepository } from './place.repository';
import { PlaceTags } from './place.tags';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { AreaModule } from '../area/area.module';
import { UtilityModule } from '../../common/utility/utility.module';
import { AdditionalMaterialModule } from '../additional-material/am.module';

const PROVIDERS: Provider[] = [{
  provide: PlaceTags.PLACE_SERVICE,
  useClass: PlaceService,
}];

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceRepository]),
    CategoryModule,
    FileModule,
    AreaModule,
    UtilityModule,
    AdditionalMaterialModule
  ],
  controllers: [PlaceController],
  providers: [
    ...PROVIDERS,
  ],
  exports: [
    ...PROVIDERS,
  ],
})
export class PlaceModule {
}
