import { Module, Global, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigProvider } from './auth-config.provider';
import { ConfigProvider } from '../../config/config.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTags } from './auth.tags';

const PROVIDERS: Provider[] = [
    {
        useClass: AuthService,
        provide: AuthTags.AUTH_SERVICE,
    },
];

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: AuthConfigProvider,
            inject: [ConfigProvider],
        }),
        PassportModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [...PROVIDERS, AuthConfigProvider, LocalStrategy, JwtStrategy],
    exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}
