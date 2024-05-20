import { ISyncService } from './interfaces/isync.service';
import moment from 'moment';

export class SyncService implements ISyncService {
    createLastUpdate(): number {
        return moment().unix();
    }

    convertLastUpdate(lastUpdate: number): Date {
        return lastUpdate ? moment.unix(lastUpdate).toDate() : moment.utc().toDate();
    }
}
