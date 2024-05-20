import {
    Post,
    Controller,
    Inject,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Request,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';
import { IAuthService } from './interfaces/iauth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '../user/dto/user.dto';
import { AuthTags } from './auth.tags';

@Controller(AuthTags.AUTH_CONTROLLER)
@ApiUseTags(AuthTags.AUTH_CONTROLLER)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class AuthController {
    constructor(@Inject(AuthTags.AUTH_SERVICE) private readonly authService: IAuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiImplicitBody({ name: 'user', type: UserDTO })
    login(@Request() req): Promise<any> {
        return this.authService.login(req.user);
    }
}
