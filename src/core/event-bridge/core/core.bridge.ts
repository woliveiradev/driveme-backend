import { Event } from '../event/event.bridge';
import { EventAction, EventBridge } from './types';
import { WILDCARD, withWildcard } from './utils/with-wildcard.util';

export class BridgeCore implements EventBridge {
  private readonly router: Map<string, EventAction[]> = new Map();

  public register(topic: string, action: EventAction): void {
    const actions = this.router.get(topic) ?? [];
    actions.push(action);
    this.router.set(topic, actions);
  }

  private async processAction(event: Event, action: EventAction) {
    await action.run(event);
  }

  private getActions(topic: string): EventAction[] {
    const [mainTopic] = topic.split('.');
    return [WILDCARD, topic, withWildcard(mainTopic)].flatMap((topic) => {
      return this.router.get(topic) ?? [];
    });
  }

  public publish(event: Event): void {
    const actions = this.getActions(event.topic);
    actions.forEach((action) => {
      this.processAction(event, action);
    });
  }

  public topicRegistered(topic: string): boolean {
    const actions = this.getActions(topic);
    return actions.length > 0;
  }
}
