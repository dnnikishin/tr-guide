import { DataBundleDTO } from '../dto/data-bundle.dto';

export interface IDataBundleService {
    getBundle(lastUpdate: number, version?: string): Promise<DataBundleDTO>;
}
