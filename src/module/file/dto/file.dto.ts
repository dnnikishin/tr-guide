import { FileType } from '../file-type';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsInstance, IsNotEmpty, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { FileUrl } from '../types/FileUrl';
import { FileSize } from '../types/FileSize';
import { DeviceType } from '../device-type';

export class FileDTO {
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  readonly mimetype: string;

  @IsNotEmpty() @IsInstance(FileUrl) @ValidateNested()
  @Type(() => FileUrl)
  @ApiModelProperty({ required: true, type: FileUrl })
  readonly url: FileUrl;

  @IsOptional() @IsInstance(FileSize) @ValidateNested()
  @Type(() => FileSize)
  @ApiModelProperty({ type: FileSize })
  readonly size: FileSize;

  @IsNumber() @IsNotEmpty()
  @ApiModelProperty({ required: true })
  readonly width: number;

  @IsEnum(FileType) @IsNotEmpty()
  @ApiModelProperty({ enum: Object.values(FileType), required: true })
  readonly type: FileType;

  @IsEnum(DeviceType)
  @ApiModelProperty({ enum: DeviceType, required: true })
  readonly device: DeviceType;
}
