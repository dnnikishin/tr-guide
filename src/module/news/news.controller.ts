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

import { NewsTags } from './news.tags';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { NewsEntity } from './entity/news.entity';
import { INewsService } from './interfaces/inews.service';
import { NewsDTO } from './dto/news.dto';
import { PageDTO } from '../../common/base/dto/page.dto';
import { TransformClassToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { FileTags } from '../file/file.tags';
import { CommonTags } from '../../../src/common/base/tags';

@Controller(NewsTags.CONTROLLER_ROUTE)
@ApiUseTags(NewsTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class NewsController extends AbstractBaseController<NewsEntity, NewsDTO, INewsService<NewsEntity, NewsDTO>> {
    constructor(@Inject(NewsTags.ARTICLE_SERVICE) protected readonly service: INewsService<NewsEntity, NewsDTO>) {
        super(service);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.CREATED, type: NewsEntity })
    create(@Body() data: NewsDTO): Promise<NewsEntity> {
        return this.service.create(data);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: [NewsEntity] })
    @ApiImplicitQuery({ name: 'query', type: 'string', required: false })
    @TransformClassToPlain({ groups: [CommonTags.SIMPLIFIED, FileTags.EXTENDED_FILE] })
    findAll(@Query('query') query?: string): Promise<NewsEntity[]> {
        return this.service.getNews(query);
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
    @ApiResponse({ status: HttpStatus.OK, type: NewsEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${NewsTags.ENTITY} doesn't exist` })
    @ApiImplicitParam({ name: 'id', type: 'number', required: true })
    @TransformClassToPlain({ groups: [NewsTags.EXTENDED_ARTICLE, FileTags.EXTENDED_FILE, CommonTags.SIMPLIFIED] })
    findOne(@Param('id') id: number): Promise<NewsEntity> {
        return this.service.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: NewsEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
    @ApiImplicitParam({ name: 'id', type: 'number', required: true })
    @ApiImplicitBody({ name: 'data', type: NewsDTO, required: true })
    @TransformClassToPlain({ groups: [NewsTags.EXTENDED_ARTICLE] })
    update(@Param('id') id: number, @Body() data: NewsDTO): Promise<NewsEntity> {
        return this.service.update(id, data);
    }
}
