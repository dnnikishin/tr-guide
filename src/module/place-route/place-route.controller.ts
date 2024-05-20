import { Controller, Post, Body, Get, Param, HttpStatus, Put, UseGuards, Query } from '@nestjs/common';
import { PlaceRouteTags } from './place-route.tags';
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitQuery } from '@nestjs/swagger';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { PlaceRouteEntity } from './entity/place-route.entity';
import { PlaceRouteDTO } from './dto/place-route.dto';
import { PlaceRouteService } from './place-route.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(PlaceRouteTags.CONTROLLER_ROUTE)
@ApiUseTags(PlaceRouteTags.CONTROLLER_ROUTE)
export class PlaceRouteController extends AbstractBaseController<PlaceRouteEntity, PlaceRouteDTO, PlaceRouteService> {
    constructor(protected readonly service: PlaceRouteService) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: PlaceRouteEntity })
    create(@Body() data: PlaceRouteDTO): Promise<PlaceRouteEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [PlaceRouteEntity] })
    @ApiImplicitQuery({ name: 'routeId', type: 'number', required: false })
    findAll(@Query('routeId') routeId?: number): Promise<PlaceRouteEntity[]> {
        return this.service.getPlaces(routeId);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: PlaceRouteEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${PlaceRouteTags.ENTITY} doesn't exist` })
    findOne(@Param('id') id: number): Promise<PlaceRouteEntity> {
        return this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: PlaceRouteEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    update(@Param('id') id: number, @Body() data: PlaceRouteDTO): Promise<PlaceRouteEntity> {
        return this.service.update(id, data);
    }
}
