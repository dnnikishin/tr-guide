import { Controller, Inject, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AreaTags } from './area.tags';
import { ApiUseTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { AreaEntity } from './entity/area.entity';
import { AreaDTO } from './dto/area.dto';
import { IAreaService } from './interface/iarea.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(AreaTags.AREA_ROUTE)
@ApiUseTags(AreaTags.AREA_ROUTE)
export class AreaController
    extends AbstractBaseController<AreaEntity, AreaDTO, IAreaService<AreaEntity, AreaDTO>> {

    constructor(@Inject(AreaTags.AREA_SERVICE) protected readonly service: IAreaService<AreaEntity, AreaDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: AreaEntity })
    async create(@Body() data: AreaDTO): Promise<AreaEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiOkResponse({ type: [AreaEntity] })
    async findAll(): Promise<AreaEntity[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: AreaEntity })
    @ApiNotFoundResponse({ description: `${AreaTags.ENTITY} doesn't exist` })
    findOne(@Param('id') id: number): Promise<AreaEntity> {
        return this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiOkResponse({ type: AreaEntity })
    update(@Param('id') id: number, @Body() data: AreaDTO): Promise<AreaEntity> {
        return this.service.update(id, data);
    }
}
