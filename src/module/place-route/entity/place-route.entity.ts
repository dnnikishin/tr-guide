import { Column, Entity, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { PlaceEntity } from '../../place/entity/place.entity';
import { RouteEntity } from '../../route/entity/route.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
@Entity('place_route')
export class PlaceRouteEntity extends BaseEntity {
  @Column({ nullable: true})
  @Expose()
  @ApiModelProperty({ type: 'string' })
  private readonly description: string;

  @Column({ nullable: false })
  @Expose()
  @ApiModelProperty({ type: 'number' })
  private readonly order: number;

  @Column({ nullable: true })
  @Expose()
  @ApiModelProperty({ type: 'number' })
  private readonly time: number; // in munites

  @ManyToOne(() => PlaceEntity, { nullable: false })
  @JoinColumn({ name: 'place_id' })
  readonly place: PlaceEntity;
  @Expose() @ApiModelProperty({ type: 'number' })
  @RelationId((placeRoute: PlaceRouteEntity) => placeRoute.place)
  readonly placeId: number;

  @ManyToOne(() => RouteEntity, { nullable: false })
  @JoinColumn({ name: 'route_id' })
  readonly route: RouteEntity;
  @Expose() @ApiModelProperty({ type: 'number' })
  @RelationId((placeRoute: PlaceRouteEntity) => placeRoute.route)
  readonly routeId: number;
}
