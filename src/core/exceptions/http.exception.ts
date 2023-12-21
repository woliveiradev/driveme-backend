import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus();
    response.status(status).send({
      code: exception.name,
      message: exception.message,
      resource_path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
