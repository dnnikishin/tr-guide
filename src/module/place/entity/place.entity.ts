import { Column, Entity, JoinTable, ManyToMany, RelationId, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { CategoryEntity } from '../../category/entity/category.entity';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { FileEntity } from '../../file/entity/file.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { PlaceRouteEntity } from '../../place-route/entity/place-route.entity';
import { CommonTags } from '../../../common/base/tags';
import { AreaEntity } from '../../area/entity/area.entity';
import { AdditionalMaterialEntity } from '../../additional-material/entities/am.entity';

@Entity('places')
@Exclude()
export class PlaceEntity extends BaseEntity {

  @Column()
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty({ required: true })
  private readonly name: string;

  @Column('double precision', { name: 'latitude', nullable: true })
  @ApiModelProperty({ description: 'latitude' })
  private readonly lat: number;

  @Column('double precision', { name: 'longitude', nullable: true })
  @ApiModelProperty({ description: 'longitude' })
  private readonly lng: number;

  @Column('double precision', { default: 0 })
  @ApiModelProperty({ default: 0 })
  private readonly altitude: number;

  @Column({ nullable: true })
  @ApiModelProperty()
  private readonly description: string;

  @Column({ nullable: true })
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty()
  private readonly address: string;

  @Column('jsonb', { nullable: true })
  @ApiModelProperty({ type: 'object' })
  private readonly phones: {};

  @Column({ nullable: true })
  @ApiModelProperty()
  private readonly site: string;

  @Column('jsonb', { nullable: true })
  @ApiModelProperty({ type: 'object' })
  private readonly schedule: {};

  @Column('text', { nullable: true })
  @ApiModelProperty()
  private readonly email: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  private readonly price: string;

  @ManyToMany(type => CategoryEntity)
  @JoinTable({
    name: 'place_category',
    joinColumn: {
      name: 'place_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  readonly categories: CategoryEntity[];

  @ApiModelProperty({ type: 'number', isArray: true })
  @RelationId((place: PlaceEntity) => place.categories)
  categoriesIds: number[];

  @ManyToMany(type => FileEntity, { eager: true })
  @JoinTable({
    name: 'place_file',
    joinColumn: {
      name: 'place_id',
    },
    inverseJoinColumn: {
      name: 'file_id',
    },
  })
  @ApiModelProperty({ type: () => FileEntity, isArray: true })
  readonly files: FileEntity[];

  @ApiModelProperty({ type: 'number', isArray: true })
  @RelationId((place: PlaceEntity) => place.files)
  filesIds: number[];

  @ManyToMany(type => AdditionalMaterialEntity, { eager: true })
  @JoinTable({
    name: 'place_additional',
    joinColumn: {
      name: 'place_id',
    },
    inverseJoinColumn: {
      name: 'am_id',
    },
  })
  @ApiModelProperty({ type: () => AdditionalMaterialEntity, isArray: true })
  readonly additionalMaterials: AdditionalMaterialEntity[];

  @ApiModelProperty({ type: 'number', isArray: true })
  @RelationId((place: PlaceEntity) => place.additionalMaterials)
  additionalMaterialsIds: number[];

  @OneToMany(() => PlaceRouteEntity, placeRoute => placeRoute.placeId)
  private readonly placesRoute: PlaceRouteEntity[];

  @ManyToOne(() => FileEntity, { eager: true })
  @JoinColumn({ name: 'thumbnail_id' })
  @Expose({ groups: [CommonTags.SIMPLIFIED] })
  @Type(() => FileEntity)
  @ApiModelProperty({ type: () => FileEntity })
  readonly thumbnail: FileEntity;

  @ApiModelProperty({ type: 'number' })
  @RelationId((place: PlaceEntity) => place.thumbnail)
  private readonly thumbnailId: number;

  @ManyToOne(() => AreaEntity, { eager: true })
  @JoinColumn({ name: 'area_id' })
  readonly area: AreaEntity;
  
  @RelationId((place: PlaceEntity) => place.area)
  readonly areaId: number;
}
