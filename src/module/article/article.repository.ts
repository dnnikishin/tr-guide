import { EntityRepository, getRepository, FindConditions, getManager, IsNull } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ArticleEntity } from './entity/article.entity';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends BaseRepository<ArticleEntity> {
    async paginate(page: number, limit: number, findConditions: FindConditions<ArticleEntity>): Promise<[ArticleEntity[], number]> {
        Object.assign(findConditions, {deleted: IsNull()});
        return getRepository(ArticleEntity)
            .findAndCount({
                where: findConditions,
                skip: page * limit,
                take: limit,
            });
    }

    async paginateWithSearch(page: number, limit: number, query: string, regexpQuery: string): Promise<[ArticleEntity[], number]> {
        const parameter = {
            "query": regexpQuery,
            "text": query
        };

        console.log('page'); console.log(page);
        console.log('limit'); console.log(limit);

        const articles: ArticleEntity[] = await getManager()
            .createQueryBuilder(ArticleEntity, 'article')
            .leftJoinAndSelect('article.files', 'files')
            .leftJoinAndSelect('article.thumbnail', 'thumbnail')
            .where("article.title ~* :query")
            .andWhere("article.deleted is null")
            .orderBy("similarity(article.title, :text) ", "DESC")
            .addOrderBy('article.id', 'ASC')
            .setParameters(parameter)
            .getMany();

        console.log(articles);
        const count: number = articles.length;
        return [articles.splice(page * limit, limit), count];
    }

    private async getTotal(regexpQuery: string): Promise<number> {
        const articles: ArticleEntity[] = await getManager()
            .createQueryBuilder(ArticleEntity, 'article')
            .where("article.title ~* :query")
            .andWhere("article.deleted is null")
            .setParameter("query", regexpQuery)
            .getMany();
        return articles.length;
    }

    async getByTitlePart(text: string, query: string): Promise<ArticleEntity[]> {
        const parameter = {
            "query": query,
            "text": text
        };

        const articles: ArticleEntity[] = await getManager()
            .createQueryBuilder(ArticleEntity, 'article')
            .leftJoinAndSelect('article.files', 'files')
            .leftJoinAndSelect('article.thumbnail', 'thumbnail')
            .where("article.title ~* :query")
            .orderBy("similarity(article.title, :text) ", "DESC")
            .setParameters(parameter)
            .getMany();

        return articles;
    }
}
