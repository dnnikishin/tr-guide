import { Controller, Inject, UseGuards, Post, HttpStatus, Body, Get, Param, Put } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdditionalMaterialTags } from './am.tags';
import { IAmService } from './interface/iam.service';
import { AdditionalMaterialEntity } from './entities/am.entity';
import { AdditionalMaterialDTO } from './dto/am.dto';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { AuthGuard } from '@nestjs/passport';

@Controller(AdditionalMaterialTags.CONTROLLER_ROUTE)
@ApiUseTags(AdditionalMaterialTags.CONTROLLER_ROUTE)
export class AmController extends AbstractBaseController<AdditionalMaterialEntity, AdditionalMaterialDTO, IAmService<AdditionalMaterialEntity, AdditionalMaterialDTO>> {
    constructor(@Inject(AdditionalMaterialTags.AM_SERVICE) readonly service: IAmService<AdditionalMaterialEntity, AdditionalMaterialDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: AdditionalMaterialEntity })
    async create(@Body() data: AdditionalMaterialDTO): Promise<AdditionalMaterialEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [AdditionalMaterialEntity] })
    async findAll(): Promise<AdditionalMaterialEntity[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: AdditionalMaterialEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${AdditionalMaterialTags.ENTITY} does not exist` })
    async findOne(@Param('id') id: number): Promise<AdditionalMaterialEntity> {
        return this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: AdditionalMaterialEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    async update(@Param('id') id: number, @Body() data: AdditionalMaterialDTO): Promise<AdditionalMaterialEntity> {
        return await this.service.update(id, data);
    }
}
