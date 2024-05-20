import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class PlaceRouteDTO {
  @Expose()
  @IsString()
  @ApiModelProperty()
  readonly description: string;

  @Expose()
  @IsInt() @IsNotEmpty()
  @ApiModelProperty()
  readonly order: number;

  @Expose()
  @IsNumber()
  @ApiModelProperty()
  readonly time: number; // in munites

  @Expose()
  @IsInt() @IsNotEmpty()
  @ApiModelProperty({ type: 'number', required: true })
  readonly placeId: number;

  @Expose()
  @IsInt() @IsNotEmpty()
  @ApiModelProperty({ type: 'number', required: true })
  readonly routeId: number;
}
