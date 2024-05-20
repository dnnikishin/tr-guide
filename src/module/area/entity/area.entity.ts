import { Entity, Column, ManyToOne, JoinColumn, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { PlaceEntity } from '../../place/entity/place.entity';
import { RouteEntity } from '../../route/entity/route.entity';

@Entity('areas')
export class AreaEntity extends BaseEntity {
    @Column('text')
    readonly title: string;

    @ManyToOne(() => AreaEntity, location => location.children)
    @JoinColumn({ name: 'parent_id'})
    readonly parent: AreaEntity;
    @RelationId((location: AreaEntity) => location.parent)
    readonly parentId: number;

    @OneToMany(() => AreaEntity, location => location.parent)
    readonly children: AreaEntity[];
    @RelationId((location: AreaEntity) => location.children)
    readonly childrenIds: number[];

    @OneToMany(() => PlaceEntity, place => place.area)
    readonly places: PlaceEntity[];

    @OneToMany(() => RouteEntity, route => route.area)
    readonly routes: RouteEntity[];
}
