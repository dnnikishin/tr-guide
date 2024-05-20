import { Injectable } from '@nestjs/common';

import { MainSectionEntity } from './entity/main-section.entity';
import { IMainSectionService } from './interfaces/imain-section.service';
import { MainSectionDTO } from './dto/main-section.dto';
import { MainSectionRepository } from './main-section.repository';
import { NonRelationCrudService } from '../../common/base/non-relation-crud.service';

@Injectable()
export class MainSectionService
    extends NonRelationCrudService<MainSectionEntity, MainSectionDTO, MainSectionRepository>
    implements IMainSectionService<MainSectionEntity, MainSectionDTO> {

    constructor(protected readonly repository: MainSectionRepository) {
        super(repository);
    }
}
