import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { IPagination } from '../../../common/base/interfaces/ipagination.service';
import { PageDTO } from '../../../common/base/dto/page.dto';
import { IQueryFilterService } from '../../../common/base/interfaces/ifilterbyquery.service';
import { ArticleEntity } from '../entity/article.entity';

export interface IArticleService<T extends BaseEntity, DTO>
    extends ICrudService<T, DTO>, IPagination, IQueryFilterService<T> {
        getByMainSectionId(page: number, limit: number, mainSectionId: number): Promise<PageDTO>;
        getByMainSectionIdAndSubSectionId(page: number, limit: number, mainSectionId: number, subSectionId: number): Promise<PageDTO>;
        getArticles(query?: string): Promise<ArticleEntity[]>;
        filterWhithPagination(page: number, limit: number, query: string): Promise<PageDTO>;
    }
