import { UserEntity } from '../../user/entities/user.entity';

export interface IAuthService {
    login(user: UserEntity): Promise<any>;
    validateUser(username: string, password: string): Promise<UserEntity | null>;
}
