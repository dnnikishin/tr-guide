import { LinkEntity } from "./entity/link.entity";
import { EntityRepository, getRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

@EntityRepository(LinkEntity)
export class LinkRepository extends BaseRepository<LinkEntity> {
    async getLinkById(id: number): Promise<LinkEntity | undefined> {
        return getRepository(LinkEntity)
          .createQueryBuilder()
          .where({ id })
          .getOne();
      }
}
