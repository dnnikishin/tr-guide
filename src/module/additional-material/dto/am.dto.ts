import { IsNumber, IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

export class AdditionalMaterialDTO {

    @IsNotEmpty() @IsString()
    @Expose() @ApiModelProperty()
    readonly name: string;

    @IsNumber()
    @Expose() @ApiModelProperty()
    readonly iosFileId: number;

    @IsNumber()
    @Expose() @ApiModelProperty()
    readonly androidFileId: number;
}