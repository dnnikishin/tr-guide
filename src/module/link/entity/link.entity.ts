import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../common/base/entity/base.entity";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity('link')
export class LinkEntity extends BaseEntity {

    @Column()
    @ApiModelProperty({required: true})
    readonly name: string;

    @Column()
    @ApiModelProperty({required: true})
    readonly url: string;
}