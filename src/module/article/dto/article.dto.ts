import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';

export class ArticleDTO {
    @ApiModelProperty({ required: true })
    @IsString() @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsString()
    readonly text: string;

    @ApiModelProperty({ required: true })
    @IsNumber() @IsNotEmpty()
    readonly mainSectionId: number;

    @ApiModelProperty({ required: true })
    @IsNumber() @IsNotEmpty()
    readonly subSectionId: number;

    @ApiModelProperty({ type: 'number', isArray: true })
    @IsArray() @IsOptional()
    readonly filesIds: number[];

    @ApiModelProperty({ type: 'number', required: true })
    @IsNumber() @IsOptional()
    readonly thumbnailId: number;
}
