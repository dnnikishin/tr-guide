import { IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class FileSize {
  @IsNumber()
  @Expose()
  @ApiModelProperty({ required: true })
  readonly original: number;

  @IsNumber()
  @Expose()
  @ApiModelProperty({ required: true })
  readonly thumb: number;
}
