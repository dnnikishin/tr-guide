import { Entity, Column, JoinColumn, ManyToOne, RelationId, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../../common/base/entity/base.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { NewsTags } from '../news.tags';
import { FileEntity } from '../../file/entity/file.entity';
import { CommonTags } from '../../../common/base/tags';

@Entity('news')
@Exclude()
export class NewsEntity extends BaseEntity {
    @Column({ nullable: false })
    @Expose() @ApiModelProperty({ required: true })
    private readonly title: string;

    @Column({ type: 'text' })
    @Expose({ groups: [NewsTags.EXTENDED_ARTICLE] }) @ApiModelProperty()
    private readonly text: string;

    @ManyToMany(() => FileEntity, { eager: true })
    @JoinTable({
        name: 'news_file',
        joinColumn: {
            name: 'news_id',
        },
        inverseJoinColumn: {
            name: 'file_id',
        },
    })
    @Expose() @ApiModelProperty({ type: () => FileEntity, isArray: true })
    readonly files: FileEntity[];

    @Expose() @ApiModelProperty({ type: 'number', isArray: true })
    @RelationId((news: NewsEntity) => news.files)
    private readonly filesIds: number[];


    @ManyToOne(() => FileEntity, { eager: true })
    @JoinColumn({ name: 'thumbnail_id' })
    @Expose({ groups: [CommonTags.SIMPLIFIED] })
    @Type(() => FileEntity)
    @ApiModelProperty({ type: () => FileEntity })
    readonly thumbnail: FileEntity;

    @ApiModelProperty({ type: 'number' }) @Expose({ groups: [CommonTags.SIMPLIFIED] })
    @RelationId((news: NewsEntity) => news.thumbnail)
    private readonly thumbnailId: number;
}
