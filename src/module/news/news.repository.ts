import { EntityRepository, getRepository, FindConditions, getManager } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { NewsEntity } from './entity/news.entity';

@EntityRepository(NewsEntity)
export class NewsRepository extends BaseRepository<NewsEntity> {
    async paginate(page: number, limit: number, findConditions: FindConditions<NewsEntity>): Promise<[NewsEntity[], number]> {
        return getRepository(NewsEntity)
            .findAndCount({
                where: findConditions,
                skip: page * limit,
                take: limit,
            });
    }

    async paginateWithSearch(page: number, limit: number, query: string, regexpQuery: string): Promise<[NewsEntity[], number]> {
        const parameter = {
            "query": regexpQuery,
            "text": query
        };

        const news: NewsEntity[] = await getManager()
            .createQueryBuilder(NewsEntity, 'news')
            .leftJoinAndSelect('news.files', 'files')
            .leftJoinAndSelect('news.thumbnail', 'thumbnail')
            .where("news.title ~* :query")
            .andWhere("news.deleted is null")
            .orderBy("similarity(news.title, :text) ", "DESC")
            .addOrderBy('news.id', 'ASC')
            .setParameters(parameter)
            .getMany();

        const count: number = news.length;
        return [news.splice(page * limit, limit), count];
    }

    private async getTotal(regexpQuery: string): Promise<number> {
        const news: NewsEntity[] = await getManager()
            .createQueryBuilder(NewsEntity, 'news')
            .where("news.title ~* :query")
            .andWhere("news.deleted is null")
            .setParameter("query", regexpQuery)
            .getMany();
        return news.length;
    }

    async getByTitlePart(text: string, query: string): Promise<NewsEntity[]> {
        const parameter = {
            "query": query,
            "text": text
        };

        const news: NewsEntity[] = await getManager()
            .createQueryBuilder(NewsEntity, 'news')
            .leftJoinAndSelect('news.files', 'files')
            .leftJoinAndSelect('news.thumbnail', 'thumbnail')
            .where("news.title ~* :query")
            .orderBy("similarity(news.title, :text) ", "DESC")
            .setParameters(parameter)
            .getMany();

        return news;
    }
}
