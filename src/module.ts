import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from 'core/context';
import { EventBridgeModule } from 'core/event-bridge';
import { ExceptionsModule } from 'core/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContextModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
