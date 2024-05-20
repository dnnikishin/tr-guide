import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigProvider } from '../../../config/config.provider';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configProvider: ConfigProvider) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configProvider.ENV.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}
