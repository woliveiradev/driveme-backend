import { beforeEach, describe, expect, it } from 'vitest';
import { ContextNotFound } from './exceptions/context-not-found.exception';
import { RequestContext } from './request.context';
import { HttpContext, HttpContextProps } from './types';

let requestContext: HttpContext;

const RequestContextData: HttpContextProps = {
  requestId: 'request-id',
};

beforeEach(() => {
  requestContext = new RequestContext();
});

describe('New App Context', () => {
  it('should be able to store new context data', () => {
    requestContext.new(RequestContextData, () => {
      const context = requestContext.get();
      expect(context).toStrictEqual(RequestContextData);
    });
  });
});

describe('App Context Get Store', () => {
  it('should not be able to get store when context not exists', () => {
    expect(() => requestContext.get()).toThrowError(new ContextNotFound());
  });

  it('should be able to get store when context exists', () => {
    requestContext.new(RequestContextData, () => {
      const context = requestContext.get();
      expect(context).toStrictEqual(RequestContextData);
    });
  });
});

describe('App Context Has Store', () => {
  it('should be able to return false when context not exists', () => {
    const hasContext = requestContext.hasContext();
    expect(hasContext).toBeFalsy();
  });

  it('should be able to return true when context exists', () => {
    requestContext.new(RequestContextData, () => {
      const hasContext = requestContext.hasContext();
      expect(hasContext).toBeTruthy();
    });
  });
});
