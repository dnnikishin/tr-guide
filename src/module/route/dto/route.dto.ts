import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RouteType } from '../route-type';

export class RouteDTO {
  @Expose()
  @IsString()
  @ApiModelProperty({ required: true })
  private readonly name: string;

  @Expose()
  @IsOptional() @IsString()
  @ApiModelProperty()
  private readonly description: string;

  @Expose()
  @IsOptional() @IsEnum(RouteType)
  @ApiModelProperty({ enum: RouteType })
  private readonly type: RouteType;

  @Expose()
  @IsOptional() @IsNumber()
  @ApiModelProperty({ description: 'in meters' })
  private readonly distance: number; // in meters

  @Expose()
  @IsOptional() @IsArray()
  @ApiModelProperty({ type: 'number', isArray: true})
  readonly categoriesIds?: number[];

  @Expose()
  @IsNumber()
  @ApiModelProperty({ type: 'number', required: true })
  readonly thumbnailId: number;

  @IsNumber()
  @ApiModelProperty({ type: 'number', required: true })
  readonly areaId: number;

  // @Expose({ name: 'placesInRoute' })
  // @IsOptional() @IsArray()
  // @ApiModelProperty({ type: [PlaceRouteDto] })
  // readonly placeRoutes: PlaceRouteEntity[];
}
