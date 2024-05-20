import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleController } from './article.controller';
import { ArticleTags } from './article.tags';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { FileModule } from '../file/file.module';
import { MainSectionModule } from '../main-section/main-section.module';
import { SubSectionModule } from '../subsection/subsection.module';
import { UtilityModule } from '../../common/utility/utility.module';

const PROVIDERS: Provider[] = [
    {
        provide: ArticleTags.ARTICLE_SERVICE,
        useClass: ArticleService,
    },
];

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleRepository]),
        FileModule,
        MainSectionModule,
        SubSectionModule,
        UtilityModule
    ],
    controllers: [
        ArticleController,
    ],
    providers: [
        ...PROVIDERS,
    ],
    exports: [
        ...PROVIDERS,
    ],
})
export class ArticleModule {}
