import { Injectable } from "@nestjs/common";
import { NonRelationCrudService } from "../../common/base/non-relation-crud.service";
import { LinkEntity } from "./entity/link.entity";
import { LinkDTO } from "./dto/link.dto";
import { LinkRepository } from "./link.repository";
import { ILinkService } from "./interface/ilink.service";

@Injectable()
export class LinkService
  extends NonRelationCrudService<LinkEntity, LinkDTO, LinkRepository>
  implements ILinkService<LinkEntity, LinkDTO> {

  constructor(readonly repository: LinkRepository) {
    super(repository);
  }

  async getLinkById(id: Number): Promise<LinkEntity> {
    if (id === null) {
      return null;
    }
    return this.repository.getLinkById(id.valueOf());
  }
}