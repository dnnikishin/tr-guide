import { PageDTO } from '../dto/page.dto';

export interface IPagination {
    paginate(
        page: number,
        limit: number,
        findConditions: object,
    ): Promise<PageDTO>;
}
