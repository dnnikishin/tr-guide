import { BaseEntity } from './entity/base.entity';
import { IBaseController } from './interfaces/ibase.controller';
import { ICrudService } from './interfaces/icrud.service';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Delete, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { CategoryTags } from '../../module/category/category.tags';
import { AuthGuard } from '@nestjs/passport';

export abstract class AbstractBaseController<T extends BaseEntity, DTO, S extends ICrudService<T, DTO>> implements IBaseController<T, DTO> {
  protected constructor(protected readonly service: S) {
  }

  abstract create(data: DTO): Promise<T> ;

  abstract findAll(): Promise<T[]>;

  abstract findOne(id: number): Promise<T>;

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, description: `${CategoryTags.ENTITY} deleted successfully.` })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);

  }

  abstract update(id: number, data: DTO): Promise<T>;

}
