import { Module, Provider } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryTags } from './category.tags';
import { RouteRepository } from '../route/route.repository';
import { PlaceRepository } from '../place/place.repository';

const providers: Provider[] = [
  {
    useClass: CategoryService,
    provide: CategoryTags.CATEGORY_SERVICE,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, PlaceRepository, RouteRepository])],
  providers: [
    CategoryService,
  ],
  controllers: [CategoryController],
  exports: [
    ...providers,
  ],
})
export class CategoryModule {
}
