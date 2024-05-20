import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class PageDTO {
    @IsNumber() @IsNotEmpty()
    @ApiModelProperty({ required: true })
    readonly page: number;

    @IsNumber() @IsNotEmpty()
    @ApiModelProperty({ required: true })
    readonly limit: number;

    @IsNumber() @IsNotEmpty()
    @ApiModelProperty({ required: true  })
    readonly totalCount: number;

    @IsArray()
    @ApiModelProperty({ required: true })
    readonly data: object[];
}
