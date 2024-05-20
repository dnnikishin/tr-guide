import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Inject,
    Post,
    HttpStatus,
    Get,
    Body,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { MainSectionEntity } from './entity/main-section.entity';
import { MainSectionDTO } from './dto/main-section.dto';
import { IMainSectionService } from './interfaces/imain-section.service';
import { MainSectionTags } from './main-section.tags';
import { AuthGuard } from '@nestjs/passport';

@Controller(MainSectionTags.CONTROLLER_ROUTE)
@ApiUseTags(MainSectionTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class MainSectionController
    extends AbstractBaseController<MainSectionEntity, MainSectionDTO, IMainSectionService<MainSectionEntity, MainSectionDTO>> {
    constructor(@Inject(MainSectionTags.SECTION_SERVICE) readonly service: IMainSectionService<MainSectionEntity, MainSectionDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: MainSectionEntity })
    create(@Body() data: MainSectionDTO): Promise<MainSectionEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [MainSectionEntity] })
    findAll(): Promise<MainSectionEntity[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: MainSectionEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${MainSectionTags.ENTITY} doesn't exist` })
    findOne(@Param('id') id: number): Promise<MainSectionEntity> {
        return this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: MainSectionEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    update(@Param('id') id: number, @Body() data: MainSectionDTO): Promise<MainSectionEntity> {
        return this.service.update(id, data);
    }
}
