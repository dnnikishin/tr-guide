import { INestApplication, Injectable } from '@nestjs/common';
import { IAppProvider } from './interface/IAppProvider';

@Injectable()
export class CorsProvider implements IAppProvider {
  init(app: INestApplication): void {
    app.enableCors({
      allowedHeaders: [
        'Cache-Control',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'x-api-token',
        'Access-Control-Allow-Headers',
        'Access-Control-Request-Method',
        'Authorization',
      ],
      credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      maxAge: 60 * 60 * 24 * 365,
      preflightContinue: false, // Pass the CORS preflight response to the next handler.
    });
  }
}
