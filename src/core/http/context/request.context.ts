import { AsyncLocalStorage } from 'async_hooks';
import { ContextNotFound } from './exceptions/context-not-found.exception';
import { HttpContext, HttpContextCallback, HttpContextProps } from './types';

export class RequestContext implements HttpContext {
  private readonly context = new AsyncLocalStorage<HttpContextProps>();

  public new(
    httpContext: HttpContextProps,
    callback: HttpContextCallback,
  ): void {
    this.context.run(httpContext, callback);
  }

  public get(): HttpContextProps {
    const httpContext = this.context.getStore();
    if (!httpContext) throw new ContextNotFound();
    return httpContext;
  }

  public hasContext(): boolean {
    return !!this.context.getStore();
  }
}
