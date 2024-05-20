import { Injectable } from '@nestjs/common';
import { RelationCrudService } from '../../common/base/relation-crud.service';
import { AreaEntity } from './entity/area.entity';
import { IAreaService } from './interface/iarea.service';
import { AreaDTO } from './dto/area.dto';
import { AreaRepository } from './area.repository';

@Injectable()
export class AreaService
    extends RelationCrudService<AreaEntity, AreaDTO, AreaRepository>
    implements IAreaService<AreaEntity, AreaDTO> {

    constructor(protected readonly repository: AreaRepository) {
        super(repository);
    }

    async convertToEntity(data: AreaDTO): Promise<AreaEntity> {
        const { parentId, childrenIds, ...otherFields } = data;
        const parent: AreaEntity = await this.repository.findAreaById(parentId);
        const children: AreaEntity[] = await this.repository.findByIds(childrenIds);

        return this.repository.create({ ...otherFields, parent, children });
    }

    async getAreaById(id: number): Promise<AreaEntity | undefined> {
        return this.repository.findAreaById(id);
    }
}
