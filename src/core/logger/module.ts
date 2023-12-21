import { Global, Module, Scope } from '@nestjs/common';
import { WinstonLogger } from './winston.logger';
import { ContextModule } from 'core/context';

export const LOGGER_TOKEN = Symbol('LOGGER');

@Global()
@Module({
  imports: [ContextModule],
  providers: [
    {
      provide: LOGGER_TOKEN,
      useClass: WinstonLogger,
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
