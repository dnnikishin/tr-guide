import { INestApplication } from '@nestjs/common';

export interface IAppProvider {
  init(app: INestApplication): void;
}
