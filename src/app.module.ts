import { Module } from '@nestjs/common';
import { CategoryModule } from './module/category/category.module';
import { FileModule } from './module/file/file.module';
import { PlaceModule } from './module/place/place.module';
import { RouteModule } from './module/route/route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { CorsProvider } from './common/provider/cors.provider';
import { SwaggerProvider } from './common/provider/swagger.provider';
import { ErrorHandler } from './common/filter/http-error.filter';
import { APP_FILTER } from '@nestjs/core';
import { DbProvider } from './common/provider/db.provider';
import { ValidationProvider } from './common/provider/validation.provider';
import { ArticleModule } from './module/article/article.module';
import { MainSectionModule } from './module/main-section/main-section.module';
import { SubSectionModule } from './module/subsection/subsection.module';
import { PlaceRouteModule } from './module/place-route/place-route.module';
import { UploadModule } from './config/multer.module';
import { DataBundleModule } from './module/data-bundle/data-bundle.module';
import { AreaModule } from './module/area/area.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ARModule } from './module/ar/ar.module';
import { UtilityModule } from './common/utility/utility.module';
import { AdditionalMaterialModule } from './module/additional-material/am.module';
import { LinkModule } from './module/link/link.module';
import { NewsModule } from './module/news/news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CategoryModule,
    FileModule,
    PlaceModule,
    RouteModule,
    ConfigModule,
    UploadModule,
    ArticleModule,
    MainSectionModule,
    SubSectionModule,
    PlaceRouteModule,
    DataBundleModule,
    AreaModule,
    UserModule,
    AuthModule,
    ARModule,
    UtilityModule,
    AdditionalMaterialModule,
    LinkModule,
    NewsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
    CorsProvider,
    SwaggerProvider,
    DbProvider,
    ValidationProvider,
  ],
})
export class AppModule {}
