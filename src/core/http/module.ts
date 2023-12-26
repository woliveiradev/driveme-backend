import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { HttpExceptionHandler } from './exceptions/http.exception';
import { RequestContext } from './context';

export const APP_CONTEXT_TOKEN = Symbol('CONTEXT');

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
    {
      provide: APP_CONTEXT_TOKEN,
      useClass: RequestContext,
    },
  ],
})
export class HttpModule {}
