import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class SubSectionDTO {
    @IsString() @IsNotEmpty()
    @Expose() @ApiModelProperty({ required: true })
    readonly title: string;

    @IsString() @IsOptional()
    @Expose() @ApiModelProperty()
    readonly description: string;

    @IsNumber() @IsNotEmpty()
    @Expose() @ApiModelProperty({ type: 'number', required: true })
    readonly mainSectionId: number;
}
