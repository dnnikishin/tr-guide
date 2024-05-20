export interface ISyncService {
    createLastUpdate(): number;
    convertLastUpdate(lastUpdate: number): Date;
}
