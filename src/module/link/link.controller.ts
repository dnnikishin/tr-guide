import { AbstractBaseController } from "../../common/base/abstract-base.controller";
import { LinkEntity } from "./entity/link.entity";
import { LinkDTO } from "./dto/link.dto";
import { ILinkService } from "./interface/ilink.service";
import { LinkTags } from "./link.tags";
import { Inject, UseInterceptors, ClassSerializerInterceptor, Controller, UseGuards, Post, HttpStatus, Body, Get, Param, Put } from "@nestjs/common";
import { ApiUseTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller(LinkTags.CONTROLLER_ROUTE)
@ApiUseTags(LinkTags.CONTROLLER_ROUTE)
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController extends AbstractBaseController<LinkEntity, LinkDTO, ILinkService<LinkEntity, LinkDTO>> {    
  constructor(@Inject(LinkTags.LINK_SERVICE) readonly service: ILinkService<LinkEntity, LinkDTO>) {
    super(service);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: LinkEntity })
  async create(@Body() data: LinkDTO): Promise<LinkEntity> {
    return this.service.create(data);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [LinkEntity] })
  async findAll(): Promise<LinkEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: LinkEntity })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${LinkTags.ENTITY} does not exist` })
  async findOne(@Param('id') id: number): Promise<LinkEntity> {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: LinkEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() data: LinkDTO): Promise<LinkEntity> {
    return this.service.update(id, data);
  }
}