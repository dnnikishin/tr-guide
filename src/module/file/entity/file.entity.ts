import { Column, Entity, OneToMany, OneToOne, ManyToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { FileType } from '../file-type';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { FileUrl } from '../types/FileUrl';
import { FileSize } from '../types/FileSize';
import { PlaceEntity } from '../../place/entity/place.entity';
import { RouteEntity } from '../../route/entity/route.entity';
import { CommonTags } from '../../../common/base/tags';
import { ArticleEntity } from '../../article/entity/article.entity';
import { AREntity } from '../../ar/entities/ar.entity';
import { IsNumber } from 'class-validator';
import { FileTags } from '../file.tags';
import { DeviceType } from '../device-type';
import { AdditionalMaterialEntity } from '../../additional-material/entities/am.entity';

@Entity('files')
@Exclude()
export class FileEntity extends BaseEntity {
  @Column() @Expose({ groups: [FileTags.EXTENDED_FILE] })
  @ApiModelProperty()
  readonly mimetype: string;

  @Column('jsonb')
  @Expose({ groups: [CommonTags.SIMPLIFIED, FileTags.EXTENDED_FILE] })
  @ApiModelProperty({ required: true, type: FileUrl })
  readonly url: FileUrl;

  @Column('jsonb', { nullable: true }) @Expose({ groups: [FileTags.EXTENDED_FILE] })
  @ApiModelProperty({ type: () => FileSize })
  readonly size: FileSize;

  @Column('enum', { enum: FileType }) @Expose({ groups: [FileTags.EXTENDED_FILE] })
  @ApiModelProperty({ enum: FileType, required: true })
  readonly type: FileType;

  @Column() @Expose({ groups: [FileTags.EXTENDED_FILE] })
  @IsNumber()
  @ApiModelProperty({ required: true })
  readonly width: number;

  @Column('enum', { enum: DeviceType, name: 'device_type' }) @Expose({ groups: [FileTags.EXTENDED_FILE] })
  @ApiModelProperty({ enum: DeviceType, required: true })
  readonly device: DeviceType;

  @OneToMany(() => PlaceEntity, place => place.thumbnail)
  private readonly places: PlaceEntity[];

  @OneToMany(() => RouteEntity, route => route.thumbnail)
  private readonly routes: RouteEntity[];

  @OneToMany(() => ArticleEntity, article => article.thumbnail)
  private readonly articles: ArticleEntity[];

  @OneToOne(type => AREntity, ar => ar.recognitionImage)
  readonly recognitionImage: AREntity;

  @OneToOne(type => AdditionalMaterialEntity, am => am.iosFile)
  private readonly iosFile: AdditionalMaterialEntity;

  @OneToOne(type => AdditionalMaterialEntity, am => am.androidFile)
  private readonly androidFile: AdditionalMaterialEntity;
}
