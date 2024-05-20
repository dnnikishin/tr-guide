import { Module, Provider } from '@nestjs/common';
import { PlaceModule } from '../place/place.module';
import { RouteModule } from '../route/route.module';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { DataBundleController } from './data-bundle.controller';
import { DataBundleTags } from './data-bundle.tags';
import { DataBundleService } from './data-bundle.service';
import { SyncService } from './sync.service';
import { ARModule } from '../ar/ar.module';

const PROVIDERS: Provider[] = [
    {
        provide: DataBundleTags.DATA_BUNDLE_SERVICE,
        useClass: DataBundleService,
    },
    {
        provide: DataBundleTags.SYNC_SERVICE,
        useClass: SyncService,
    },
];

@Module({
    imports: [
        PlaceModule,
        RouteModule,
        FileModule,
        CategoryModule,
        ARModule
    ],
    controllers: [DataBundleController],
    providers: [
        ...PROVIDERS,
    ],
})
export class DataBundleModule {}
