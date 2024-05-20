import { FileEntity } from '../../file/entity/file.entity';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { AdditionalMaterialEntity } from '../../../module/additional-material/entities/am.entity';
import { LinkEntity } from '../../../module/link/entity/link.entity';

@Exclude()
export class ArOutputDTO {
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
    amObjectId: number;

    @Expose()
    @ApiModelProperty({ type: FileEntity })
    am: AdditionalMaterialEntity;

    @Expose()
    @ApiModelProperty({ type: 'number' })
    linkId: number;

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