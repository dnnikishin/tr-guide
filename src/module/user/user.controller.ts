import { UserTags } from "./user.tags";
import { Controller, Inject, Post, UseGuards, HttpStatus, Get, Put, Body, Param, UseInterceptors, ClassSerializerInterceptor, Delete } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AbstractBaseController } from "../../common/base/abstract-base.controller";
import { IUserService } from "./interfaces/iuser.service";
import { UserEntity } from "./entities/user.entity";
import { UserDTO } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller(UserTags.USER_CONTROLLER)
@ApiUseTags(UserTags.USER_CONTROLLER)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController extends AbstractBaseController<UserEntity, UserDTO, IUserService<UserEntity, UserDTO>> {

    constructor(@Inject(UserTags.USER_SERVICE) readonly service: IUserService<UserEntity, UserDTO>) {
        super(service);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
    create(@Body() data: UserDTO): Promise<UserEntity> {
        return this.service.create(data);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: [UserEntity] })
    findAll(): Promise<UserEntity[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${UserTags.ENTITY} does not exist` })
    findOne(@Param('id') id: number): Promise<UserEntity> {
        return this.service.findOne(id);
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    update(@Param('id') id: number, @Body() data: UserDTO): Promise<UserEntity> {
        return this.service.update(id, data);
    }
}