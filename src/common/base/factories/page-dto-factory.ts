import { PageDTO } from '../dto/page.dto';

export class PageDTOFactory {
    public static create(
        page: number,
        limit: number,
        totalCount: number,
        data: object[],
    ): PageDTO {
        return {

            page,

            limit,

            totalCount,

            data,

        };
    }
}
