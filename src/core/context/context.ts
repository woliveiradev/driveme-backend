import { AsyncLocalStorage } from 'async_hooks';
import { ContextNotFound } from './exceptions/context-not-found.exception';
import { AppContext, ContextCallback } from './types';

export class Context<ContextProps = unknown>
  implements AppContext<ContextProps>
{
  private readonly store: AsyncLocalStorage<ContextProps>;

  constructor() {
    this.store = new AsyncLocalStorage();
  }

  public new(context: ContextProps, callback: ContextCallback): void {
    this.store.run(context, callback);
  }

  public getStore(): ContextProps {
    const store = this.store.getStore();
    if (!store) throw new ContextNotFound();
    return store;
  }

  public has(): boolean {
    return !!this.store.getStore();
  }
}
