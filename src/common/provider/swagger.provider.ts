import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigProvider } from '../../config/config.provider';
import { SwaggerBaseConfig } from '@nestjs/swagger/dist/interfaces/swagger-base-config.interface';
import { IAppProvider } from './interface/IAppProvider';

@Injectable()
export class SwaggerProvider implements IAppProvider {
  private readonly apiBasePath: string;
  private readonly title: string = 'Я здесь';
  private readonly description: string = 'Travel API backend';
  private readonly version: string;
  private readonly env: string;

  constructor(config: ConfigProvider) {
    Logger.log(config.ENV.API_BASE_PATH, SwaggerProvider.name);
    this.apiBasePath = config.ENV.API_BASE_PATH;
    this.version = config.ENV.SWAGGER_VERSION;
    this.env = config.ENV.NODE_ENV;
  }

  init(app: INestApplication): void {
    const options = this.getOptions(this.env);
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${this.apiBasePath}/swagger`, app, document);
  }

  private getOptions(env: string): SwaggerBaseConfig {
    let schem: any = env === "development" ? "http" : "https";
    return new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .addBearerAuth('Authorization', 'header')
      .setSchemes(schem)
      .build();
  }
}
