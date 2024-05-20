import { Module, Provider } from '@nestjs/common';
import { PlaceRouteService } from './place-route.service';
import { PlaceRouteController } from './place-route.controller';
import { PlaceRouteTags } from './place-route.tags';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRouteRepository } from './place-route.repository';
import { PlaceModule } from '../place/place.module';
import { RouteModule } from '../route/route.module';

const PROVIDERS: Provider[] = [
  {
    provide: PlaceRouteTags.PLACE_ROUTE_SERVICE,
    useClass: PlaceRouteService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceRouteRepository]),
    PlaceModule,
    RouteModule
  ],
  controllers: [
    PlaceRouteController,
  ],
  providers: [
    ...PROVIDERS,
  ],
  exports: [
    ...PROVIDERS,
  ],
})
export class PlaceRouteModule {}
