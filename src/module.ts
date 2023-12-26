import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventBridgeModule } from 'core/event-bridge';
import { HttpModule } from 'core/http';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
