import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '../../user/entities/user.entity';
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/iauth.service';
import { AuthTags } from '../auth.tags';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(AuthTags.AUTH_SERVICE) private readonly authService: IAuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserEntity> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
