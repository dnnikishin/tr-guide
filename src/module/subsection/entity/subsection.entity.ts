import { Entity, Column, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { MainSectionEntity } from '../../main-section/entity/main-section.entity';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ArticleEntity } from '../../article/entity/article.entity';

@Entity('subsections')
@Exclude()
export class SubSectionEntity extends BaseEntity {
    @Column()
    @Expose() @ApiModelProperty()
    private readonly title: string;

    @Column({ type: 'text', nullable: true })
    @Expose() @ApiModelProperty()
    private readonly description: string;

    @ManyToOne(() => MainSectionEntity, mainSection => mainSection.subsections)
    @JoinColumn({ name: 'main_section_id' })
    readonly mainSection: MainSectionEntity;

    @RelationId((subSection: SubSectionEntity) => subSection.mainSection)
    @Expose() @ApiModelProperty({ required: true })
    readonly mainSectionId: number;

    @OneToMany(() => ArticleEntity, article => article.subSectionId)
    readonly articles: ArticleEntity[];
}
