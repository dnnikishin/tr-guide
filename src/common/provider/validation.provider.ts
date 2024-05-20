import { INestApplication, Injectable, ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../exception/validation.exception';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { IAppProvider } from './interface/IAppProvider';

@Injectable()
export class ValidationProvider implements IAppProvider {
  init(app: INestApplication): void {
    const validationOptions: ValidationPipeOptions = {
      transform: true, // transform literal object to class
      whitelist: true, // remove all unknown properties
      forbidNonWhitelisted: true, // throw exception, if get unknown properties
      skipMissingProperties: true, // won't throw an error, when entity has optional fields and don't get it
      exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
    };

    app.useGlobalPipes(new ValidationPipe(validationOptions));
  }
}
