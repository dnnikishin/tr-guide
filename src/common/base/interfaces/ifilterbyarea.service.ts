export interface IAreaFilterService<T> {
    filterByArea(areaId: number): Promise<T[]>;
}
