import { Module, Provider } from '@nestjs/common';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { RouteRepository } from './route.repository';
import { RouteTags } from './route.tags';
import { FileModule } from '../file/file.module';
import { AreaModule } from '../area/area.module';
import { UtilityModule } from '../../common/utility/utility.module';

const PROVIDERS: Provider[] = [
  {
    provide: RouteTags.ROUTE_SERVICE,
    useClass: RouteService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteRepository]),
    CategoryModule,
    FileModule,
    AreaModule,
    UtilityModule
  ],
  controllers: [RouteController],
  providers: [
    ...PROVIDERS,
  ],
  exports: [
    ...PROVIDERS,
  ],
})
export class RouteModule {
}
