import { EntityRepository, getRepository } from 'typeorm';
import { FileEntity } from './entity/file.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(FileEntity)
export class FileRepository extends BaseRepository<FileEntity> {
    async getFileById(id: number): Promise<FileEntity | undefined> {
        return getRepository(FileEntity)
          .createQueryBuilder()
          .where({ id })
          .getOne();
      }
}
