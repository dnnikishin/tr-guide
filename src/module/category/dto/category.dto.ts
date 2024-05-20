import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  @ApiModelProperty({ required: true, type: 'string' })
  @IsString() @IsNotEmpty()
  readonly name: string;
}
