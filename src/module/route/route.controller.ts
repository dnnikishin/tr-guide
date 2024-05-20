import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { RouteTags } from './route.tags';
import { ApiResponse, ApiUseTags, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RouteEntity } from './entity/route.entity';
import { RouteDTO } from './dto/route.dto';
import { IRouteService } from './interface/iroute.service';
import { TransformClassToPlain } from 'class-transformer';
import { CommonTags } from '../../common/base/tags';
import { AuthGuard } from '@nestjs/passport';
import { PageDTO } from '../../common/base/dto/page.dto';

@Controller(RouteTags.CONTROLLER_ROUTE)
@ApiUseTags(RouteTags.CONTROLLER_ROUTE)
export class RouteController extends AbstractBaseController<RouteEntity, RouteDTO, IRouteService<RouteEntity, RouteDTO>> {

  constructor(@Inject(RouteTags.ROUTE_SERVICE) readonly service: IRouteService<RouteEntity, RouteDTO>) {
    super(service);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: RouteEntity })
  create(@Body() data: RouteDTO): Promise<RouteEntity> {
    return this.service.create(data);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [RouteEntity] })
  @ApiImplicitQuery({ name: 'areaId', required: false })
  @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
  @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED] })
  findAll(@Query('areaId') areaId?: number, @Query('query') query?: string): Promise<RouteEntity[]> {
    return this.service.getRoutes(areaId, query);
  }

  @Get('/pagination')
  @ApiResponse({ status: HttpStatus.OK, type: PageDTO })
  @ApiImplicitQuery({ name: 'areaId', required: false })
  @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
  @ApiImplicitQuery({ name: 'page', required: false })
  @ApiImplicitQuery({ name: 'take', required: false })
  @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED] })
  findPage(
    @Query('areaId') areaId: number,
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('take') take: number = 10
  ): Promise<PageDTO>  {
    return this.service.paginate(areaId, query, page, take);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: RouteEntity })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${RouteTags.ENTITY} does not exist` })
  findOne(@Param('id') id: number): Promise<RouteEntity> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: RouteEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() data: RouteDTO): Promise<RouteEntity> {
    return this.service.update(id, data);
  }
}
