import { Injectable, BadRequestException } from '@nestjs/common';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { AdditionalMaterialEntity } from './entities/am.entity';
import { FileService } from '../file/file.service';
import { IAmService } from './interface/iam.service';
import { AdditionalMaterialDTO } from './dto/am.dto';
import { AdditionalMaterialRepository } from './am.repository';
import { FileEntity } from '../file/entity/file.entity';
import { FileType } from '../file/file-type';
import { PlaceRepository } from '../place/place.repository';
import { ArRepository } from '../ar/ar.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AdditionalMaterialService
    extends RelationCrudService<AdditionalMaterialEntity, AdditionalMaterialDTO, AdditionalMaterialRepository>
    implements IAmService<AdditionalMaterialEntity, AdditionalMaterialDTO> {

    constructor(
        protected readonly repository: AdditionalMaterialRepository,
        private readonly fileService: FileService,
        private readonly placeRepository: PlaceRepository,
        private readonly arRepository: ArRepository,
    ) {
        super(repository);
    }

    async convertToEntity(data: AdditionalMaterialDTO): Promise<AdditionalMaterialEntity> {
        const { iosFileId, androidFileId, ...otherFields } = data;
        const iosFile: FileEntity = await this.fileService.findOne(iosFileId);
        const androidFile: FileEntity = await this.fileService.findOne(androidFileId);

        if (!(this.checkType(iosFile) && this.checkType(androidFile))) {
            throw new BadRequestException('', 'Incorrect file type, must be audio, video, historical photo, panoramic photo or 3D-model');
        }

        return this.repository.create({ ...otherFields, iosFile, androidFile });
    }

    private checkType(file: FileEntity): boolean {
        return file.type === FileType.HISTORICAL_PHOTO || file.type === FileType.AUDIO
            || file.type === FileType.PANORAMIC_PHOTO || file.type === FileType.THREE_D_MODEL
            || file.type === FileType.VIDEO;
    }

    @Transactional()
    public async update(id: number, data: AdditionalMaterialDTO): Promise<AdditionalMaterialEntity> {
        const entityFromDb = await this.findOne(id);
        const entityFromRequest = await this.convertToEntity(data);
        Object.assign(entityFromRequest, { updated: new Date() });
        const candidate = { ...entityFromDb, ...entityFromRequest };
        await this.repository.save(candidate);
        await this.placeRepository.updatePlacesByAmId(id);
        await this.arRepository.updateArsByAmId(id);
        return this.findOne(id);
    }

    @Transactional()
    public async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.repository.update(id, { deleted: new Date(), updated: new Date() } as any);
        await this.placeRepository.deleteAmFromPlaces(id);
        await this.arRepository.deleteAmFromArs(id);
    }
}
