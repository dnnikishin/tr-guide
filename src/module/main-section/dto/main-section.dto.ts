import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class MainSectionDTO {
    @IsString() @IsNotEmpty()
    @Expose() @ApiModelProperty({ required: true })
    readonly title: string;
}
