import { Controller, UseInterceptors, ClassSerializerInterceptor, Inject, Post, HttpStatus, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { SubSectionTags } from './subsection.tags';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { SubSectionEntity } from './entity/subsection.entity';
import { SubSectionDTO } from './dto/subsection.dto';
import { ISubSectionService } from './interfaces/isubsection.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(SubSectionTags.CONTROLLER_ROUTE)
@ApiUseTags(SubSectionTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class SubSectionController
    extends AbstractBaseController<SubSectionEntity, SubSectionDTO, ISubSectionService<SubSectionEntity, SubSectionDTO>> {

    constructor(@Inject(SubSectionTags.SUBSECTION_SERVICE) protected readonly service: ISubSectionService<SubSectionEntity, SubSectionDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: SubSectionEntity })
    create(@Body() data: SubSectionDTO): Promise<SubSectionEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [SubSectionEntity] })
    findAll(): Promise<SubSectionEntity[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: SubSectionEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${SubSectionTags.ENTITY} doesn't exist` })
    async findOne(@Param('id') id: number): Promise<SubSectionEntity> {
        return await this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()

    @ApiResponse({ status: HttpStatus.OK, type: SubSectionEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    update(@Param('id') id: number, @Body() data: SubSectionDTO): Promise<SubSectionEntity> {
        return this.service.update(id, data);
    }
}
