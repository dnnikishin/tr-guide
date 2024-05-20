import { Injectable, BadRequestException } from "@nestjs/common";
import { AREntity } from "./entities/ar.entity";
import { ArDTO } from "./dto/ar.dto";
import { ArRepository } from "./ar.repository";
import { IArService } from "./interface/iar.service";
import { FileService } from "../file/file.service";
import { FileEntity } from "../file/entity/file.entity";
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { FileType } from "../file/file-type";
import { ArDataOutputDTO } from "./dto/ar.data.output.dto";
import { AdditionalMaterialService } from "../additional-material/am.service";
import { AdditionalMaterialEntity } from "../additional-material/entities/am.entity";
import { LinkService } from "../link/link.service";
import { LinkEntity } from "../link/entity/link.entity";
import { ArOutputDTO } from "./dto/ar.output.dto";

@Injectable()
export class ArService
  extends RelationCrudService<AREntity, ArDTO, ArRepository>
  implements IArService<AREntity, ArDTO> {

  constructor(
    protected readonly repository: ArRepository,
    private readonly fileService: FileService,
    private readonly amService: AdditionalMaterialService,
    private readonly linkService: LinkService
  ) {
    super(repository);
  }

  async createAr(data: ArDTO): Promise<ArOutputDTO> {
    await this.checkDto(data);
    const entity: AREntity = await this.create(data);
    return this.convertToDto(entity);
  }

  async getAr(id: number): Promise<ArOutputDTO> {
    const entity: AREntity = await this.findOne(id);
    return this.convertToDto(entity);
  }

  async getArs(): Promise<ArOutputDTO[]> {
    const entities: AREntity[] = await this.findAll();
    const entityDtos: ArOutputDTO[] = entities.map(this.convertToDto.bind(this));
    return entityDtos;
  }

  async updateAr(id: number, data: ArDTO): Promise<ArOutputDTO> {
    await this.checkDto(data);
    const entityFromDb = await this.findOne(id);
    const newRecognitionImage: FileEntity | undefined = await this.fileService.getFileById(data.recognitionImageId);
    const newlink: LinkEntity = await this.linkService.getLinkById(data.linkId);
    const objectIdsFromDb: number[] = this.getAmIds(entityFromDb);
    const objectIdsFromRequest: number[] = data.amObjectId !== null ? [data.amObjectId] : [];
    const deletedObjectsId: number[] = objectIdsFromDb.filter(x => !objectIdsFromRequest.includes(x));
    const addedObjectsId: number[] = objectIdsFromRequest.filter(x => !objectIdsFromDb.includes(x));
    await this.repository.updateAr(id, data.name, newRecognitionImage, newlink, deletedObjectsId, addedObjectsId);
    const entity: AREntity = await this.findOne(id);
    return this.convertToDto(entity);
  }

  private async checkDto(data: ArDTO): Promise<boolean> {
    const { recognitionImageId, ...otherRouteFields } = data;
    const getTwoObjects: boolean = data.amObjectId != null && data.linkId != null;
    const getNullObjects: boolean = data.amObjectId == null && data.linkId == null;

    if (getNullObjects || getTwoObjects) {
      throw new BadRequestException('', 'Must be link or additional material not both');
    }

    const recognitionImage: FileEntity | undefined = await this.fileService.getFileById(recognitionImageId);

    if (recognitionImage === undefined) {
      throw new BadRequestException('', 'Incorrect recognition image id');
    } else if (recognitionImage.type !== FileType.RECOGNITION_IMAGE) {
      throw new BadRequestException('', 'File whith recognitionImageId has incorrect type, must be recognition_image, but get:  ' + recognitionImage.type);
    }
    return true;
  }

  async convertToEntity(data: ArDTO): Promise<AREntity> {
    const { recognitionImageId, amObjectId, linkId, ...otherRouteFields } = data;

    const recognitionImage: FileEntity = await this.fileService.getFileById(recognitionImageId);
    const ams: AdditionalMaterialEntity[] = await this.amService.findAllByIds([amObjectId]);
    const link: LinkEntity = await this.linkService.getLinkById(linkId);
    return this.repository.create({ ...otherRouteFields, recognitionImage, ams, link });
  }

  convertToDataDto(data: AREntity): ArDataOutputDTO {
    let androidFile: FileEntity;
    let iosFile: FileEntity;

    if (data.ams.length !== 0) {
      const firstElem: AdditionalMaterialEntity = data.ams.shift();
      androidFile = firstElem.androidFile;
      iosFile = firstElem.iosFile;
    }

    const dto: ArDataOutputDTO = {
      id: Number(data.id),
      name: data.name,
      recognitionImageId: data.recognitionImage.id,
      recognitionImage: data.recognitionImage,
      iosObjectId: iosFile !== undefined ? iosFile.id : null,
      iosObject: iosFile !== undefined ? iosFile : null,
      androidObjectId: androidFile !== undefined ? androidFile.id : null,
      androidObject: androidFile !== undefined ? androidFile : null,
      link: data.link,
      created: data.created,
      updated: data.updated,
      deleted: data.deleted
    };

    return dto;
  }

  private getAmIds(ar: AREntity): number[] {
    let result: number[] = [];
    ar.ams.forEach((item) => result.push(item.id));
    return result;
  }

  convertToDto(data: AREntity): ArOutputDTO {
    const am: AdditionalMaterialEntity = data.ams.shift();
    const link: LinkEntity = data.link;
    const dto: ArOutputDTO = {
      id: Number(data.id),
      name: data.name,
      recognitionImageId: data.recognitionImage.id,
      recognitionImage: data.recognitionImage,
      amObjectId: am !== undefined ? am.id : null,
      am: am !== undefined ? am : null,
      linkId: link !== null ? link.id : null,
      link: link !== null ? link : null,
      created: data.created,
      updated: data.updated,
      deleted: data.deleted
    };

    return dto;
  }

}