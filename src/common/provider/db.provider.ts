import { INestApplication, Injectable } from '@nestjs/common';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { IAppProvider } from './interface/IAppProvider';

@Injectable()
export class DbProvider implements IAppProvider {
  init(app: INestApplication): void {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
