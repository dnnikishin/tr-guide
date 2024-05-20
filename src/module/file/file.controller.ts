import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileEntity } from './entity/file.entity';
import { FileDTO } from './dto/file.dto';
import { FileTags } from './file.tags';
import { IFileService } from './interface/ifile.service';
import { ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile, ApiImplicitQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AbstractBaseController } from '../../common/base/abstract-base.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileType } from './file-type';
import { AuthGuard } from '@nestjs/passport';
import { VideoLinkDto } from './dto/videoLink.dto';
import { DeviceType } from './device-type';

@Controller(FileTags.CONTROLLER_ROUTE)
@ApiUseTags(FileTags.CONTROLLER_ROUTE)
export class FileController extends AbstractBaseController<FileEntity, FileDTO, IFileService<FileEntity, FileDTO>> {
  constructor(
    @Inject(FileTags.FILE_SERVICE) protected readonly service: IFileService<FileEntity, FileDTO>,
  ) {
    super(service);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: FileEntity })
  create(@Body() data: FileDTO): Promise<FileEntity> {
    return this.service.create(data);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiImplicitFile({ name: 'file', required: true })
  @ApiImplicitQuery({ name: 'type', enum: Object.values(FileType), required: true })
  @ApiImplicitQuery({ name: 'width', type: 'number', required: false })
  @ApiImplicitQuery({ name: 'device', enum: Object.values(DeviceType), required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: FileEntity })
  uploadFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Query('type') type: FileType,
    @Query('width') width: number = 0,
    @Query('device') device: DeviceType = DeviceType.ALL
  ): Promise<FileEntity> {
    return this.service.createFile(file, type, width, device);
  }

  @Post('/youTubeVideo')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.CREATED, type: FileEntity })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  createyouTubeVideo(@Body() videoLink: VideoLinkDto): Promise<FileEntity> {
    return this.service.createLink(videoLink);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [FileEntity] })
  findAll(): Promise<FileEntity[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: FileEntity })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${FileTags.ENTITY} does not exist` })
  findOne(@Param('id') id: number): Promise<FileEntity> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: FileEntity })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  update(@Param('id') id: number, @Body() data: FileDTO): Promise<FileEntity> {
    return this.service.update(id, data);
  }
}
