import { Injectable, BadRequestException } from '@nestjs/common';
import { FileEntity } from './entity/file.entity';
import { FileDTO } from './dto/file.dto';
import { FileRepository } from './file.repository';
import { NonRelationCrudService } from '../../common/base/non-relation-crud.service';
import { IFileService } from './interface/ifile.service';
import { FileType } from './file-type';
import sharp from 'sharp';
import { basename, extname } from 'path';
import { VideoLinkDto } from './dto/videoLink.dto';
import { DeviceType } from './device-type';


@Injectable()
export class FileService
  extends NonRelationCrudService<FileEntity, FileDTO, FileRepository>
  implements IFileService<FileEntity, FileDTO> {

  private readonly destination: string = 'static';

  constructor(protected readonly repository: FileRepository) {
    super(repository);
  }

  async getFileById(id: number): Promise<FileEntity | undefined> {
    return this.repository.getFileById(id);
  }

  async createLink(videoLink: VideoLinkDto): Promise<FileEntity> {
    const videoId: string = this.getVideoIdentifier(videoLink.link);
    if (videoId === '') {
      throw new BadRequestException('', 'Bad YouTube link');
    }
    const fileDTO: FileDTO = {
      mimetype: 'youtubeVideoIdentifier',
      url: {
        original: videoId,
        thumb: videoLink.link,
      },
      size: {
        original: null,
        thumb: null,
      },
      type: FileType.VIDEO,
      width: null,
      device: DeviceType.ALL
    };

    return this.create(fileDTO);
  }

  async createFile(file: Express.Multer.File, type: FileType, width: number, device: DeviceType): Promise<FileEntity> {
    if (type === FileType.IMAGE || type === FileType.HISTORICAL_PHOTO
      || type === FileType.PANORAMIC_PHOTO || type === FileType.RECOGNITION_IMAGE) {
      return this.createImage(file, type, width);
    } else if (type === FileType.THREE_D_MODEL) {
      return this.create3DObject(file, device);
    }
    else {
      const fileDTO: FileDTO = {
        mimetype: file.mimetype,
        url: {
          original: this.fixedFileLink(file),
          thumb: null,
        },
        size: {
          original: file.size,
          thumb: null,
        },
        type,
        width: null,
        device: DeviceType.ALL
      };

      return this.create(fileDTO);
    }
  }

  private async create3DObject(file: Express.Multer.File, device: DeviceType) {
    if (device === undefined || device === DeviceType.ALL) {
      throw new BadRequestException('', 'If file is 3d object it must have iOS or Android type');
    }

    const fileDTO: FileDTO = {
      mimetype: file.mimetype,
      url: {
        original: this.fixedFileLink(file),
        thumb: null,
      },
      size: {
        original: file.size,
        thumb: null,
      },
      type: FileType.THREE_D_MODEL,
      width: null,
      device
    };

    return this.create(fileDTO);
  }

  private async createImage(file: Express.Multer.File, type: FileType, width: number): Promise<FileEntity> {
    const ext = extname(file.originalname);
    const filename = basename(file.filename, extname(file.originalname));
    const thumbPath: string = `${file.destination}/${filename}.thumb${ext}`;

    let info: sharp.OutputInfo;
    if (type === FileType.RECOGNITION_IMAGE) {
      const fileInfo: sharp.Metadata = await sharp(file.path).metadata();
      if (fileInfo.height < fileInfo.width) {
        info = await sharp(file.path)
          .resize(null, 512)
          .toFile(thumbPath);
      } else {
        info = await sharp(file.path)
          .resize(512)
          .toFile(thumbPath);
      }
    } else {
      info = await sharp(file.path)
        .resize(780)
        .toFile(thumbPath);
    }

    const fileDTO: FileDTO = {
      mimetype: file.mimetype,
      url: {
        original: this.fixedFileLink(file),
        thumb: `${this.destination}/${filename}.thumb${ext}`,
      },
      size: {
        original: file.size,
        thumb: info.size,
      },
      type: type,
      width: width,
      device: DeviceType.ALL
    };

    return this.create(fileDTO);
  }

  private getVideoIdentifier(link: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return '';
    }
  }

  private fixedFileLink(file: Express.Multer.File): string {
    const ext = extname(file.originalname);
    const filename = basename(file.filename, extname(file.originalname));
    return `${this.destination}/${filename}${ext}`;
  }
}
