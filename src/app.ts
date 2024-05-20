import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigProvider } from './config/config.provider';
import { SwaggerProvider } from './common/provider/swagger.provider';
import { CorsProvider } from './common/provider/cors.provider';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { DbProvider } from './common/provider/db.provider';
import { IAppProvider } from './common/provider/interface/IAppProvider';
import { ValidationProvider } from './common/provider/validation.provider';

class ServerApplication {

  async run(): Promise<void> {
    const app: INestApplication = await NestFactory.create<NestExpressApplication>(AppModule);
    const { PORT, API_BASE_PATH, NODE_ENV } = app.get(ConfigProvider.name).ENV;

    if (NODE_ENV === 'development') {
      app.useGlobalInterceptors(new LoggingInterceptor());
    }

    app.setGlobalPrefix(API_BASE_PATH);
    this.initProviders(app, NODE_ENV);

    await app.listen(PORT);

    Logger.log(`Server running on http://localhost:${PORT}`, ServerApplication.name);
  }

  private initProviders(app: INestApplication, NODE_ENV: any): void {
    const providers: IAppProvider[] = [];
    providers.push(app.get(ValidationProvider.name));
    providers.push(app.get(CorsProvider.name));
    if (NODE_ENV !== 'production') {
      providers.push(app.get(SwaggerProvider.name));
    }
    providers.push(app.get(DbProvider.name));
    providers.forEach(provider => provider.init(app));
  }
}

export default new ServerApplication();
