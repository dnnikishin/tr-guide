import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { CategoryEntity } from './entity/category.entity';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryTags } from './category.tags';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { ICategoryService } from './interface/icategory.service';
import { AuthGuard } from '@nestjs/passport';

@Controller(CategoryTags.CONTROLLER_ROUTE)
@ApiUseTags(CategoryTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController extends AbstractBaseController<CategoryEntity, CategoryDTO, ICategoryService<CategoryEntity, CategoryDTO>> {
  constructor(@Inject(CategoryTags.CATEGORY_SERVICE) readonly service: ICategoryService<CategoryEntity, CategoryDTO>) {
    super(service);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryEntity })
  async create(@Body() data: CategoryDTO): Promise<CategoryEntity> {
    return this.service.create(data);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  async findAll(): Promise<CategoryEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CategoryEntity })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${CategoryTags.ENTITY} does not exist` })
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: CategoryEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() data: CategoryDTO): Promise<CategoryEntity> {
    return this.service.update(id, data);
  }
}
