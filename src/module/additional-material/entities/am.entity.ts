import { Entity, Column, OneToOne, JoinColumn, RelationId, ManyToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ApiModelProperty } from "@nestjs/swagger";
import { FileEntity } from "../../file/entity/file.entity";
import { AREntity } from "../../ar/entities/ar.entity";

@Entity('additional_material')
@Exclude()
export class AdditionalMaterialEntity extends BaseEntity {
    @Column()
    @ApiModelProperty({ required: true })
    readonly name: string;

    @OneToOne(type => FileEntity, { eager: true })
    @JoinColumn({ name: "ios_file_id" })
    @ApiModelProperty({ required: true })
    readonly iosFile: FileEntity;

    @ApiModelProperty({ type: 'number' })
    @RelationId((am: AdditionalMaterialEntity) => am.iosFile)
    private readonly iosFileId: number;

    @OneToOne(type => FileEntity, { eager: true })
    @JoinColumn({ name: "android_file_id" })
    @ApiModelProperty({ required: true })
    readonly androidFile: FileEntity;

    @ApiModelProperty({ type: 'number' })
    @RelationId((am: AdditionalMaterialEntity) => am.androidFile)
    private readonly androidFileId: number;

    @ManyToMany(type => AREntity, ars => ars.ams)
    readonly ars: AREntity[];
}