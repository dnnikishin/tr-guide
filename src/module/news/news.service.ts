
import { Injectable } from '@nestjs/common';
import { NewsEntity } from './entity/news.entity';
import { NewsDTO } from './dto/news.dto';
import { INewsService } from './interfaces/inews.service';
import { NewsRepository } from './news.repository';
import { PageDTO } from '../../common/base/dto/page.dto';
import { PageDTOFactory } from '../../common/base/factories/page-dto-factory';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { FileEntity } from '../file/entity/file.entity';
import { FileService } from '../file/file.service';
import { RegexpUtility } from '../../common/utility/regexp.utility';

@Injectable()
export class NewsService
    extends RelationCrudService<NewsEntity, NewsDTO, NewsRepository>
    implements INewsService<NewsEntity, NewsDTO> {

    constructor(
        protected readonly repository: NewsRepository,
        private readonly fileService: FileService,
        private readonly regexpUtility: RegexpUtility
    ) {
        super(repository);
    }

    async convertToEntity(data: NewsDTO): Promise<NewsEntity> {
        const { filesIds, thumbnailId, ...otherFields } = data;
        const files: FileEntity[] = await this.fileService.findAllByIds(filesIds);
        const thumbnail: FileEntity = await this.fileService.findOne(thumbnailId);

        return this.repository.create({ ...otherFields, files, thumbnail });
    }

    async paginate(page: number, limit: number, findConditions: {}): Promise<PageDTO> {
        const [news, totalCount] = await this.repository.paginate(page - 1, limit, findConditions);
        return PageDTOFactory.create(page, limit, totalCount, news);
    }

    async getNews(query?: string): Promise<NewsEntity[]> {
        return (query !== undefined) ? this.filterBySearchQuery(query) : this.findAll();
    }

    async filterBySearchQuery(query: string): Promise<NewsEntity[]> {
        const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
        return await this.repository.getByTitlePart(query, regexpQuery);
    }

    async filterWhithPagination(page: number, limit: number, query: string): Promise<PageDTO> {
        const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
        const [news, totalCount] = await this.repository.paginateWithSearch(page - 1, limit, query, regexpQuery);
        return PageDTOFactory.create(page, limit, totalCount, news);
    }

}
