import { Module, Global } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from './config.module';
import { MulterConfigService } from './multer-config.service';
import { ConfigProvider } from './config.provider';

@Global()
@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useClass: MulterConfigService,
            inject: [ConfigProvider],
        }),
    ],
    providers: [MulterConfigService],
    exports: [MulterModule],
})
export class UploadModule {}
