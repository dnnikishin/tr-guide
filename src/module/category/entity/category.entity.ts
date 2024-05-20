import { Column, Entity } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('categories')
@Exclude()
export class CategoryEntity extends BaseEntity {

  @Column({ unique: true })
  @Expose() @ApiModelProperty({ type: 'string', required: true })
  readonly name: string;
}
