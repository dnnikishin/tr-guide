import { ICrudService } from "../../../common/base/interfaces/icrud.service";
import { BaseEntity } from "../../../common/base/entity/base.entity";

export interface IAmService<T extends BaseEntity, DTO> extends ICrudService<T, DTO> {

}