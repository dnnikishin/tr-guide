import { ICrudService } from "../../../common/base/interfaces/icrud.service";
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { AREntity } from "../entities/ar.entity";
import { ArDataOutputDTO } from "../dto/ar.data.output.dto";
import { ArDTO } from "../dto/ar.dto";
import { ArOutputDTO } from "../dto/ar.output.dto";

export interface IArService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {
     convertToDataDto(data: AREntity): ArDataOutputDTO;

    createAr(data: ArDTO): Promise<ArOutputDTO>;

    updateAr(id: number, data: ArDTO): Promise<ArOutputDTO>; 

    getAr(id: number): Promise<ArOutputDTO>;

    getArs(): Promise<ArOutputDTO[]>;
}