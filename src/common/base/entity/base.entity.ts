import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('increment')
  @Expose() @ApiModelProperty()
  readonly id: number;

  @Column({ name: 'createdAt' })
  @Expose() @ApiModelProperty({ type: 'string', format: 'date-time' })
  readonly created: Date = new Date();

  @Column({ name: 'updatedAt' })
  @Expose() @ApiModelProperty({ type: 'string', format: 'date-time' })
  updated: Date = new Date();

  @Column({ nullable: true, name: 'removedAt' })
  @Expose() @ApiModelProperty({ type: 'string', format: 'date-time' })
  readonly deleted: Date;

}
