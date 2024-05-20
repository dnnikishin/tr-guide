import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDTO {
    @ApiModelProperty()
    @Expose()
    @IsString() @IsNotEmpty()
    readonly username: string;

    @ApiModelProperty()
    @Expose()
    @IsString() @IsNotEmpty()
    readonly password: string;
}
