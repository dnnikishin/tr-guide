import { Entity, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { FileEntity } from '../../file/entity/file.entity';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { AdditionalMaterialEntity } from '../../additional-material/entities/am.entity';
import { LinkEntity } from '../../link/entity/link.entity';

@Entity('ar')
@Exclude()
export class AREntity extends BaseEntity {
    @Column()
    @ApiModelProperty({ required: true })
    readonly name: string;

    @OneToOne(type => FileEntity, { eager: true })
    @JoinColumn({ name: "id_recognition_image" })
    @ApiModelProperty({ required: true })
    readonly recognitionImage: FileEntity;

    @ManyToMany(() => AdditionalMaterialEntity, { eager: true })
    @JoinTable({
        name: 'ar_additional',
        joinColumn: {
            name: 'ar_id'
        },
        inverseJoinColumn: {
            name: 'am_id'
        },
    })
    @Expose() @ApiModelProperty({ type: () => AdditionalMaterialEntity, isArray: true })
    readonly ams: AdditionalMaterialEntity[];

    @OneToOne(type => LinkEntity, { eager: true })
    @JoinColumn({ name: "link_id" })
    @ApiModelProperty({ required: true })
    readonly link: LinkEntity;
}
