import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

type ErrorMessage = string | { [key: string]: string[] };
type ErrorResponse = {
  code: number,
  timeStamp: string,
  path: string,
  method: string,
  message: ErrorMessage,
};

@Catch()
export class ErrorHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const { url: path, method } = request;
    const code = this.getCode(exception);
    const message = this.getMessage(exception);
    const timeStamp = new Date().toLocaleDateString();
    const errorResponse: ErrorResponse = { code, timeStamp, path, method, message };

    Logger.error(`${method} ${path}`, JSON.stringify(errorResponse), ErrorHandler.name);

    response.status(code).json(errorResponse);
  }

  getMessage(exception: Error): ErrorMessage {
    if (exception.message && (exception as HttpException).message.error) {
      return (exception as HttpException).message.error;
    }
    return  exception.message || '';

  }

  getCode(exception: Error): number {
    return (exception instanceof HttpException) ? (exception as HttpException).getStatus() : HttpStatus.BAD_REQUEST;
  }
}
