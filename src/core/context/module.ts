import { Module } from '@nestjs/common';
import { Context } from './context';

export const APP_CONTEXT_TOKEN = Symbol('CONTEXT');

@Module({
  providers: [
    {
      provide: APP_CONTEXT_TOKEN,
      useClass: Context,
    },
  ],
  exports: [APP_CONTEXT_TOKEN],
})
export class ContextModule {}
