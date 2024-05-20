import { Entity, Column, JoinColumn, ManyToOne, RelationId, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { MainSectionEntity } from '../../main-section/entity/main-section.entity';
import { SubSectionEntity } from '../../subsection/entity/subsection.entity';
import { ArticleTags } from '../article.tags';
import { FileEntity } from '../../file/entity/file.entity';
import { CommonTags } from '../../../common/base/tags';

@Entity('articles')
@Exclude()
export class ArticleEntity extends BaseEntity {
    @Column({ nullable: false })
    @Expose() @ApiModelProperty({ required: true })
    private readonly title: string;

    @Column({ type: 'text' })
    @Expose({ groups: [ArticleTags.EXTENDED_ARTICLE] }) @ApiModelProperty()
    private readonly text: string;

    @ManyToOne(() => MainSectionEntity, mainSection => mainSection.id)
    @JoinColumn({ name: 'main_section_id' })
    readonly mainSection: MainSectionEntity;
    @Expose() @ApiModelProperty({ type: 'number', required: true })
    @RelationId((article: ArticleEntity) => article.mainSection)
    readonly mainSectionId: number;

    @ManyToOne(() => SubSectionEntity, subsection => subsection.id)
    @JoinColumn({ name: 'subsection_id' })
    readonly subSection: SubSectionEntity;
    @Expose() @ApiModelProperty({ type: 'number', required: true })
    @RelationId((article: ArticleEntity) => article.subSection)
    readonly subSectionId: number;

    @ManyToMany(() => FileEntity, { eager: true })
    @JoinTable({
        name: 'article_file',
        joinColumn: {
            name: 'article_id',
        },
        inverseJoinColumn: {
            name: 'file_id',
        },
    })
    @Expose() @ApiModelProperty({ type: () => FileEntity, isArray: true })
    readonly files: FileEntity[];

    @Expose() @ApiModelProperty({ type: 'number', isArray: true })
    @RelationId((article: ArticleEntity) => article.files)
    private readonly filesIds: number[];


    @ManyToOne(() => FileEntity, { eager: true })
    @JoinColumn({ name: 'thumbnail_id' })
    @Expose({ groups: [CommonTags.SIMPLIFIED] })
    @Type(() => FileEntity)
    @ApiModelProperty({ type: () => FileEntity })
    readonly thumbnail: FileEntity;

    @ApiModelProperty({ type: 'number' }) @Expose({ groups: [CommonTags.SIMPLIFIED] })
    @RelationId((article: ArticleEntity) => article.thumbnail)
    private readonly thumbnailId: number;
}
