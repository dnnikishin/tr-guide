import { FileEntity } from '../../file/entity/file.entity';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { LinkEntity } from '../../link/entity/link.entity';

@Exclude()
export class ArDataOutputDTO {
    @Expose()
    @ApiModelProperty({ type: 'number' })
    id: number;

    @Expose()
    @ApiModelProperty({ type: 'string' })
    name: string;

    @Expose()
    @ApiModelProperty({ type: 'number' })
    recognitionImageId: number;

    @Expose()
    @ApiModelProperty({ type: FileEntity })
    recognitionImage: FileEntity;

    @Expose()
    @ApiModelProperty({ type: 'number' })
    iosObjectId: number;

    @Expose()
    @ApiModelProperty({ type: FileEntity })
    iosObject: FileEntity;

    @Expose()
    @ApiModelProperty({ type: 'number' })
    androidObjectId: number;

    @Expose()
    @ApiModelProperty({ type: FileEntity })
    androidObject: FileEntity;

    @Expose()
    @ApiModelProperty({type: LinkEntity})
    link: LinkEntity;

    @Expose()
    @ApiModelProperty({ type: 'string', format: 'date-time' })
    created: Date;

    @Expose()
    @ApiModelProperty({ type: 'string', format: 'date-time' })
    updated: Date;

    @Expose()
    @ApiModelProperty({ type: 'string', format: 'date-time' })
    deleted: Date;
}