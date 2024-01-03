import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BridgeCore } from './core.bridge';
import { EventActionStub } from './stubs/event-action.stub';
import { EventAction } from './types';
import { WILDCARD, withWildcard } from './utils/with-wildcard.util';
import { Event } from '../event/event.bridge';

let event: Event;
let eventActionStub: EventAction;
let bridgeCore: BridgeCore;

beforeEach(() => {
  event = new Event('Test.EventEmitted', {}, randomUUID());
  bridgeCore = new BridgeCore();
  eventActionStub = new EventActionStub();
});

describe('Bridge Core Register Route', () => {
  it('should be able to register a topic when sending valid topic format', () => {
    const validTopic = 'Test.EventEmitted';
    const result = bridgeCore.register(validTopic, eventActionStub);
    expect(bridgeCore.topicRegistered(validTopic)).toBeTruthy();
    expect(result).toBeUndefined();
  });
});

describe('Bridge Core Publish Event', () => {
  it('should be able to run a action when registered topic contains wildcard', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    bridgeCore.register(withWildcard('Test'), eventActionStub);
    bridgeCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should be able to run a action when registered topic is a wildcard', () => {
    const actionSpy = vi.spyOn(eventActionStub, 'run');
    bridgeCore.register(WILDCARD, eventActionStub);
    bridgeCore.publish(event);
    expect(actionSpy).toHaveBeenCalled();
  });
});

describe('Bridge Core Topic Registered', () => {
  it('should be able to return true when registered topic contains a wildcard', () => {
    const registeredTopic = withWildcard('Test');
    bridgeCore.register(registeredTopic, eventActionStub);
    const result = bridgeCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });

  it('should be able to return true when registered topic is exactly the same', () => {
    const registeredTopic = 'Test.EventEmitted';
    bridgeCore.register(registeredTopic, eventActionStub);
    const result = bridgeCore.topicRegistered(registeredTopic);
    expect(result).toBeTruthy();
  });
});
