import { beforeEach, describe, expect, it } from 'vitest';
import { Context } from './context';
import { AppContext } from './types';
import { ContextNotFound } from './exceptions/context-not-found.exception';

interface TestContextProps {
  correlationId: string;
}

let appContext: AppContext<TestContextProps>;

const contextData: TestContextProps = {
  correlationId: 'correlation-id',
};

beforeEach(() => {
  appContext = new Context();
});

describe('New App Context', () => {
  it('should be able to store new context data', () => {
    appContext.new(contextData, () => {
      const context = appContext.getStore();
      expect(context).toStrictEqual(contextData);
    });
  });
});

describe('App Context Get Store', () => {
  it('should not be able to get store when context not exists', () => {
    expect(() => appContext.getStore()).toThrowError(new ContextNotFound());
  });

  it('should be able to get store when context exists', () => {
    appContext.new(contextData, () => {
      const context = appContext.getStore();
      expect(context).toStrictEqual(contextData);
    });
  });
});

describe('App Context Has Store', () => {
  it('should be able to return false when context not exists', () => {
    const hasContext = appContext.has();
    expect(hasContext).toBeFalsy();
  });

  it('should be able to return true when context exists', () => {
    appContext.new(contextData, () => {
      const hasContext = appContext.has();
      expect(hasContext).toBeTruthy();
    });
  });
});
