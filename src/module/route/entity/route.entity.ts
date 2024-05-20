import { Column, Entity, JoinTable, ManyToMany, OneToMany, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { RouteType } from '../route-type';
import { CategoryEntity } from '../../category/entity/category.entity';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { PlaceRouteEntity } from '../../place-route/entity/place-route.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { FileEntity } from '../../file/entity/file.entity';
import { CommonTags } from '../../../common/base/tags';
import { AreaEntity } from '../../area/entity/area.entity';

@Entity('routes')
@Exclude()
export class RouteEntity extends BaseEntity {

  @Column()
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty({ type: 'string', required: true })
  private readonly name: string;

  @Column({ nullable: true })
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty({ type: 'string' })
  private readonly description: string;

  @Column('enum', { nullable: true, enum: RouteType })
  @ApiModelProperty({ enum: Object.values(RouteType) })
  private readonly type: RouteType;

  @Column('integer', { nullable: true })
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty({ type: 'number' })
  private readonly distance: number; // in meters

  @ManyToMany(() => CategoryEntity)
  @JoinTable({
    name: 'route_category',
    joinColumn: {
      name: 'route_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
   categories: CategoryEntity[];

  @RelationId((route: RouteEntity) => route.categories)
  @ApiModelProperty({ type: 'number', isArray: true })
   categoriesIds: number[];

  @OneToMany(() => PlaceRouteEntity, placeRoute => placeRoute.route, { eager: true })
  @ApiModelProperty({ type: () => PlaceRouteEntity, isArray: true })
  readonly placesInRoute: PlaceRouteEntity[];

  @ManyToOne(() => FileEntity, { eager: true })
  @JoinColumn({ name: 'thumbnail_id' })
  @Expose({ groups: [CommonTags.SIMPLIFIED] }) @ApiModelProperty({ type: FileEntity })
  readonly thumbnail: FileEntity;

  @ApiModelProperty({ type: 'number' })
  @RelationId((route: RouteEntity) => route.thumbnail)
  private readonly thumbnailId: number;

  @ManyToOne(() => AreaEntity, { eager: true })
  @JoinColumn({ name: 'area_id' })
  readonly area: AreaEntity;

  @RelationId((route: RouteEntity) => route.area)
  readonly areaId: number;
}
