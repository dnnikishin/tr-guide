import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { IPagination } from '../../../common/base/interfaces/ipagination.service';
import { PageDTO } from '../../../common/base/dto/page.dto';
import { IQueryFilterService } from '../../../common/base/interfaces/ifilterbyquery.service';
import { NewsEntity } from '../entity/news.entity';

export interface INewsService<T extends BaseEntity, DTO>
    extends ICrudService<T, DTO>, IPagination, IQueryFilterService<T> {
        getNews(query?: string): Promise<NewsEntity[]>;
        filterWhithPagination(page: number, limit: number, query: string): Promise<PageDTO>;
    }
