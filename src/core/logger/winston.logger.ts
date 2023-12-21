import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { APP_CONTEXT_TOKEN } from 'core/context';
import { Logger, LoggerLevel } from './types';
import { AppContext, RequestContextProps } from 'core/context/types';

export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor(
    @Inject(ConfigService)
    private readonly environment: ConfigService,
    @Inject(APP_CONTEXT_TOKEN)
    private readonly appContext: AppContext<RequestContextProps>,
  ) {
    const isProduction = this.environment.get('NODE_ENV') === 'production';
    this.logger = winston.createLogger({
      exitOnError: false,
      level: isProduction ? LoggerLevel.INFO : LoggerLevel.DEBUG,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: LoggerLevel.ERROR,
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
    if (!isProduction) {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.prettyPrint(),
        }),
      );
    }
  }

  private log(level: LoggerLevel, message: string, stackTrace?: any): void {
    const logMessage = { level, message, stackTrace, meta: {} };
    if (this.appContext.has()) {
      const context = this.appContext.getStore();
      logMessage.meta = context;
    }
    this.logger.log(logMessage);
  }

  public debug(message: string): void {
    this.log(LoggerLevel.DEBUG, message);
  }

  public info(message: string): void {
    this.log(LoggerLevel.INFO, message);
  }

  public warn(message: string): void {
    this.log(LoggerLevel.WARN, message);
  }

  public error(message: string, stackTrace?: any): void {
    this.log(LoggerLevel.ERROR, message, stackTrace);
  }
}
