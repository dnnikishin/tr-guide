import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class FileUrl {

  @IsString()
  @Expose()
  @ApiModelProperty({ required: true })
  readonly original: string;

  @IsString()
  @Expose()
  @ApiModelProperty({ required: true })
  readonly thumb: string;
}
