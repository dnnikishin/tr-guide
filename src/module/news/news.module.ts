import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsTags } from './news.tags';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';
import { FileModule } from '../file/file.module';
import { UtilityModule } from '../../common/utility/utility.module';

const PROVIDERS: Provider[] = [
    {
        provide: NewsTags.ARTICLE_SERVICE,
        useClass: NewsService,
    },
];

@Module({
    imports: [
        TypeOrmModule.forFeature([NewsRepository]),
        FileModule,
        UtilityModule
    ],
    controllers: [
        NewsController,
    ],
    providers: [
        ...PROVIDERS,
    ],
    exports: [
        ...PROVIDERS,
    ],
})
export class NewsModule {}
