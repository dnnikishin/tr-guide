import { ICrudService } from '../../../common/base/interfaces/icrud.service';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { FileEntity } from '../entity/file.entity';
import { FileType } from '../file-type';
import { VideoLinkDto } from '../dto/videoLink.dto';
import { DeviceType } from '../device-type';

export interface IFileService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
    createFile(file: Express.Multer.File, type: FileType, width: number, device: DeviceType): Promise<FileEntity>;

    createLink(identifier: VideoLinkDto): Promise<FileEntity>;

    getFileById(id: number): Promise<FileEntity | undefined>;
}
