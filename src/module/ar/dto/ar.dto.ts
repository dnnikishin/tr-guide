import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Expose } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

export class ArDTO {

    @IsNotEmpty() @IsString()
    @Expose() @ApiModelProperty()
    readonly name: string;

    @IsNotEmpty() @IsNumber()
    @Expose() @ApiModelProperty()
    readonly recognitionImageId: number;

    @IsOptional() @IsNumber()
    @Expose() @ApiModelProperty()
    readonly amObjectId: number;

    @IsOptional() @IsNumber()
    @Expose() @ApiModelProperty()
    readonly linkId: number;
}