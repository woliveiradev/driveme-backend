import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HttpExceptionHandler } from './exceptions/http.exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class HttpModule {}
