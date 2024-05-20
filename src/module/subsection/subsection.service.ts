import { Injectable, BadRequestException } from '@nestjs/common';

import { SubSectionEntity } from './entity/subsection.entity';
import { SubSectionDTO } from './dto/subsection.dto';
import { ISubSectionService } from './interfaces/isubsection.service';
import { SubSectionRepository } from './subsection.repository';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { MainSectionEntity } from '../main-section/entity/main-section.entity';
import { MainSectionRepository } from '../main-section/main-section.repository';

@Injectable()
export class SubSectionService
    extends RelationCrudService<SubSectionEntity, SubSectionDTO, SubSectionRepository>
    implements ISubSectionService<SubSectionEntity, SubSectionDTO> {

    constructor(
        protected readonly repository: SubSectionRepository,
        private readonly mainSectionRepository: MainSectionRepository,
    ) {
        super(repository);
    }

    async convertToEntity(data: SubSectionDTO): Promise<SubSectionEntity> {
        const { mainSectionId, ...otherFields } = data;
        const mainSection: MainSectionEntity = await this.mainSectionRepository.getById(mainSectionId);
        if (mainSection === undefined) {
            throw new BadRequestException('Main section not found', 'Main section not found');
        }
        return this.repository.create({ ...otherFields, mainSection });
    }
}
