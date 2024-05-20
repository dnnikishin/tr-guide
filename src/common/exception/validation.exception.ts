import { HttpException, HttpStatus, Logger, ValidationError } from '@nestjs/common';
import { ErrorHandler } from '../filter/http-error.filter';

interface ErrorMessageResponse {
  [key: string]: string[];
}

const validationErrors = (errors: ValidationError[]): ErrorMessageResponse =>
  errors.reduce((result: object, err) => {
    if (err && err.children) {
      result[err.property] = validationErrors(err.children);
    }

    if (err.constraints) {
      result[err.property] = Object.values(err.constraints);
    }
    return result;
  }, {});

export class ValidationException extends HttpException {

  constructor(errors: ValidationError[], statusCode = HttpStatus.BAD_REQUEST) {
    Logger.error(errors, ErrorHandler.name);

    let message: ErrorMessageResponse = { error: ['Unhandled exception'] };
    try {
      message = validationErrors(errors);
    } catch (e) {
      Logger.error(e, ValidationException.name);
    }
    super(
      message,
      statusCode,
    );
  }
}
