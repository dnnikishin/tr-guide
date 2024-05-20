import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from './interfaces/iauth.service';
import { UserEntity } from '../user/entities/user.entity';
import { IUserService } from '../user/interfaces/iuser.service';
import { UserDTO } from '../user/dto/user.dto';
import { UserTags } from '../user/user.tags';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(UserTags.USER_SERVICE) private readonly userService: IUserService<UserEntity, UserDTO>,
        private readonly jwtService: JwtService) { }

    async login(user: UserEntity): Promise<any> {
        const payload: any = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const foundUser: UserEntity | undefined = await this.userService.findByUsername(username);
        if (foundUser && foundUser.deleted === null && await foundUser.comparePassword(password)) {
            return foundUser;
        }

        return null;
    }
}
