import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Get,
    HttpStatus,
    Inject,
    Body,
    Param,
    Query,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiResponse,
    ApiImplicitQuery,
    ApiImplicitParam,
    ApiImplicitBody,
    ApiBearerAuth,
} from '@nestjs/swagger';

import { ArticleTags } from './article.tags';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { ArticleEntity } from './entity/article.entity';
import { IArticleService } from './interfaces/iarticle.service';
import { ArticleDTO } from './dto/article.dto';
import { PageDTO } from '../../common/base/dto/page.dto';
import { TransformClassToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { FileTags } from '../file/file.tags';
import { CommonTags } from '../../../src/common/base/tags';

@Controller(ArticleTags.CONTROLLER_ROUTE)
@ApiUseTags(ArticleTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController extends AbstractBaseController<ArticleEntity, ArticleDTO, IArticleService<ArticleEntity, ArticleDTO>> {
    constructor(@Inject(ArticleTags.ARTICLE_SERVICE) protected readonly service: IArticleService<ArticleEntity, ArticleDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: ArticleEntity })
    create(@Body() data: ArticleDTO): Promise<ArticleEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [ArticleEntity] })
    @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
    @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED, FileTags.EXTENDED_FILE] })
    findAll(@Query('query') query?: string): Promise<ArticleEntity[]> {
        return this.service.getArticles(query);
    }


    @Get('/pagination')
    @ApiResponse({ status: HttpStatus.OK, type: PageDTO })
    @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
    @ApiImplicitQuery({ name: 'page', required: false })
    @ApiImplicitQuery({ name: 'take', required: false })
    @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED, FileTags.EXTENDED_FILE] })
    findByTitle(
        @Query('query') query: string,
        @Query('page') page: number = 1,
        @Query('take') take: number = 10
    ): Promise<PageDTO> {
        return this.service.filterWhithPagination(page, take, query);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, type: ArticleEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${ArticleTags.ENTITY} doesn't exist` })
    @ApiImplicitParam({ name: 'id', type: 'number', required: true })
    @TransformClassToPlain({ groups: [ArticleTags.EXTENDED_ARTICLE, FileTags.EXTENDED_FILE, CommonTags.SIMPLIFIED] })
    findOne(@Param('id') id: number): Promise<ArticleEntity> {
        return this.service.findOne(id);
    }

    @Get('/getBySection/:mainSectionId')
    @ApiResponse({ status: HttpStatus.OK, type: PageDTO })
    @ApiImplicitQuery({ name: 'page', required: false })
    @ApiImplicitQuery({ name: 'take', required: false })
    findArticlesByMainSectionId(
        @Param('mainSectionId') mainSectionId: number,
        @Query('page') page: number = 1,
        @Query('take') take: number = 10,
    ): Promise<PageDTO> {
        return this.service.getByMainSectionId(page, take, mainSectionId);
    }

    @Get('/getBySection/:mainSectionId/:subSectionId')
    @ApiResponse({ status: HttpStatus.OK, type: PageDTO })
    @ApiImplicitQuery({ name: 'page', type: 'number', required: false })
    @ApiImplicitQuery({ name: 'take', type: 'number', required: false })
    findArticlesByMainSectionIdAndSubSectionId(
        @Param('mainSectionId') mainSectionId: number,
        @Param('subSectionId') subSectionId: number,
        @Query('page') page: number = 1,
        @Query('take') take: number = 10,
    ): Promise<PageDTO> {
        return this.service.getByMainSectionIdAndSubSectionId(page, take, mainSectionId, subSectionId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: ArticleEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    @ApiImplicitParam({ name: 'id', type: 'number', required: true })
    @ApiImplicitBody({ name: 'data', type: ArticleDTO, required: true })
    @TransformClassToPlain({ groups: [ArticleTags.EXTENDED_ARTICLE] })
    update(@Param('id') id: number, @Body() data: ArticleDTO): Promise<ArticleEntity> {
        return this.service.update(id, data);
    }
}
