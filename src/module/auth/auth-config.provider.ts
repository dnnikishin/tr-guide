import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigProvider } from '../../config/config.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfigProvider implements JwtOptionsFactory {
    constructor(private readonly configProvider: ConfigProvider) {}

    async createJwtOptions(): Promise<JwtModuleOptions> {
        return {
            secret: this.configProvider.ENV.JWT_SECRET,
            signOptions: {
                expiresIn: this.configProvider.ENV.JWT_EXPIRES_IN,
            },
        };
    }
}
