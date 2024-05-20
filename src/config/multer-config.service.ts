import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigProvider } from './config.provider';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    constructor(private configService: ConfigProvider) {}

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: this.configService.ENV.UPLOAD_STATIC_CONTENT,
                filename: (req, file, cb) => {
                    return cb(null, `${v4()}${extname(file.originalname)}`);
                },
            }),
        };
    }
}
