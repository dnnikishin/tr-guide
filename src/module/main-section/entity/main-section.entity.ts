import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { SubSectionEntity } from '../../subsection/entity/subsection.entity';
import { ArticleEntity } from '../../article/entity/article.entity';

@Entity('main_sections')
@Exclude()
export class MainSectionEntity extends BaseEntity {
    @Column()
    @Expose() @ApiModelProperty()
    private readonly title: string;

    @OneToMany(() => SubSectionEntity, subsection => subsection.mainSectionId, { eager: true })
    @Expose() @ApiModelProperty({ type: [SubSectionEntity] })
    readonly subsections: SubSectionEntity[];

    @OneToMany(() => ArticleEntity, article => article.mainSectionId)
    readonly articles: ArticleEntity[];
}
