export interface IQueryFilterService<T> {
    filterBySearchQuery(query: string): Promise<T[]>;
}
