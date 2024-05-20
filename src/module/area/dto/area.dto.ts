import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsOptional, IsNumber, IsEmpty } from 'class-validator';

export class AreaDTO {
    @ApiModelProperty()
    @IsString() @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsNumber()
    readonly parentId: number;

    @ApiModelProperty({ type: 'number', isArray: true })
    @IsArray() @IsOptional()
    readonly childrenIds: number[];
}
