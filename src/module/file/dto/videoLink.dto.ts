import { ApiModelProperty } from "@nestjs/swagger";
import { IsEnum, IsInstance, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class VideoLinkDto {
  @IsNotEmpty() 
  @ApiModelProperty({ required: true })
  readonly link: string;
}