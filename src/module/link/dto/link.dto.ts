import { IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

export class LinkDTO {

    @IsNotEmpty() @IsString()
    @Expose() @ApiModelProperty()
    readonly name: string;

    @IsNotEmpty() @IsString()
    @Expose() @ApiModelProperty()
    readonly url: string;
}