import { Injectable } from '@nestjs/common';

import { ArticleEntity } from './entity/article.entity';
import { ArticleDTO } from './dto/article.dto';
import { IArticleService } from './interfaces/iarticle.service';
import { ArticleRepository } from './article.repository';
import { PageDTO } from '../../common/base/dto/page.dto';
import { PageDTOFactory } from '../../common/base/factories/page-dto-factory';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { FileEntity } from '../file/entity/file.entity';
import { FileService } from '../file/file.service';
import { MainSectionService } from '../main-section/main-section.service';
import { MainSectionEntity } from '../main-section/entity/main-section.entity';
import { SubSectionService } from '../subsection/subsection.service';
import { SubSectionEntity } from '../subsection/entity/subsection.entity';
import { RegexpUtility } from '../../common/utility/regexp.utility';

@Injectable()
export class ArticleService
    extends RelationCrudService<ArticleEntity, ArticleDTO, ArticleRepository>
    implements IArticleService<ArticleEntity, ArticleDTO> {

    constructor(
        protected readonly repository: ArticleRepository,
        private readonly fileService: FileService,
        private readonly mainSectionService: MainSectionService,
        private readonly subSectionService: SubSectionService,
        private readonly regexpUtility: RegexpUtility
    ) {
        super(repository);
    }

    async convertToEntity(data: ArticleDTO): Promise<ArticleEntity> {
        const { mainSectionId, subSectionId, filesIds, thumbnailId, ...otherFields } = data;
        const mainSection: MainSectionEntity = await this.mainSectionService.findOne(mainSectionId);
        const subSection: SubSectionEntity = await this.subSectionService.findOne(subSectionId);
        const files: FileEntity[] = await this.fileService.findAllByIds(filesIds);
        const thumbnail: FileEntity = await this.fileService.findOne(thumbnailId);

        return this.repository.create({ ...otherFields, files, mainSection, subSection, thumbnail });
    }

    async getByMainSectionId(page: number, limit: number, mainSectionId: number): Promise<PageDTO> {
        const mainSection: MainSectionEntity = await this.mainSectionService.findOne(mainSectionId);

        return this.paginate(page, limit, { mainSection });
    }

    async getByMainSectionIdAndSubSectionId(
        page: number,
        limit: number,
        mainSectionId: number,
        subSectionId: number,
    ): Promise<PageDTO> {
        const mainSection: MainSectionEntity = await this.mainSectionService.findOne(mainSectionId);
        const subSection: SubSectionEntity = await this.subSectionService.findOne(subSectionId);

        return this.paginate(page, limit, { mainSection, subSection });
    }

    async paginate(page: number, limit: number, findConditions: {}): Promise<PageDTO> {
        const [articles, totalCount] = await this.repository.paginate(page - 1, limit, findConditions);
        return PageDTOFactory.create(page, limit, totalCount, articles);
    }

    async getArticles(query?: string): Promise<ArticleEntity[]> {
        return (query !== undefined) ? this.filterBySearchQuery(query) : this.findAll();
    }

    async filterBySearchQuery(query: string): Promise<ArticleEntity[]> {
        const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
        return await this.repository.getByTitlePart(query, regexpQuery);
    }

    async filterWhithPagination(page: number, limit: number, query: string): Promise<PageDTO> {
        const regexpQuery: string = this.regexpUtility.getRegExpFromQuery(query);
        console.log('page'); console.log(page);
        console.log('limit'); console.log(limit);
        const [articles, totalCount] = await this.repository.paginateWithSearch(page - 1, limit, query, regexpQuery);
        return PageDTOFactory.create(page, limit, totalCount, articles);
    }

}
