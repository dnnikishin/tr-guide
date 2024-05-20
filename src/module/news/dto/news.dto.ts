import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';

export class NewsDTO {
    @ApiModelProperty({ required: true })
    @IsString() @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsString()
    readonly text: string;

    @ApiModelProperty({ type: 'number', isArray: true })
    @IsArray() @IsOptional()
    readonly filesIds: number[];

    @ApiModelProperty({ type: 'number', required: true })
    @IsNumber() @IsOptional()
    readonly thumbnailId: number;
}
