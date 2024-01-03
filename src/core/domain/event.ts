import { Event } from 'core/event-bridge/event';
import { DomainEventMessage } from './types';

export abstract class DomainEvent<Message = unknown> extends Event<
  Message & DomainEventMessage
> {}
