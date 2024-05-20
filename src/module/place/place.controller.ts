import { Body, Controller, Get, Param, Post, Put, Query, Inject, UseGuards, HttpStatus} from '@nestjs/common';
import { PlaceTags } from './place.tags';
import { ApiUseTags, ApiOkResponse, ApiImplicitQuery, ApiCreatedResponse, ApiNotFoundResponse, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PlaceEntity } from './entity/place.entity';
import { PlaceDTO } from './dto/place.dto';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { MainSectionEntity } from '../main-section/entity/main-section.entity';
import { TransformClassToPlain } from 'class-transformer';
import { CommonTags } from '../../common/base/tags';
import { IPlaceService } from './interface/iplace.service';
import { AuthGuard } from '@nestjs/passport';
import { PageDTO } from '../../common/base/dto/page.dto';

@Controller(PlaceTags.CONTROLLER_ROUTE)
@ApiUseTags(PlaceTags.CONTROLLER_ROUTE)
export class PlaceController extends AbstractBaseController<PlaceEntity, PlaceDTO, IPlaceService<PlaceEntity, PlaceDTO>> {

  constructor(@Inject(PlaceTags.PLACE_SERVICE) readonly service: IPlaceService<PlaceEntity, PlaceDTO>) {
    super(service);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PlaceEntity })
  create(@Body() data: PlaceDTO): Promise<PlaceEntity> {
    return this.service.create(data);
  }

  @Get()
  @ApiOkResponse({ type: [PlaceEntity] })
  @ApiImplicitQuery({ name: 'areaId', required: false })
  @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
  @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED] })
  findAll(@Query('areaId') areaId?: number, @Query('query') query?: string): Promise<PlaceEntity[]> {
    return this.service.getPlaces(areaId, query);
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
  @ApiOkResponse({ type: PlaceEntity })
  @ApiNotFoundResponse({ description: `${PlaceTags.ENTITY} does not exist` })
  findOne(@Param('id') id: number): Promise<PlaceEntity> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MainSectionEntity })
  update(@Param('id') id: number, @Body() data: PlaceDTO): Promise<PlaceEntity> {
    return this.service.update(id, data);
  }
}
