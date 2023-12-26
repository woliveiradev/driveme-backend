export interface HttpContextProps {
  requestId: string;
}

export type HttpContextCallback = () => void;

export interface HttpContext {
  new: (httpContext: HttpContextProps, callback: () => void) => void;
  get: () => HttpContextProps;
  hasContext: () => boolean;
}
