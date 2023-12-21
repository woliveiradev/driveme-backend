export type ContextCallback = () => void;

export interface AppContext<ContextProps> {
  new: (context: ContextProps, callback: () => void) => void;
  getStore: () => ContextProps;
  has: () => boolean;
}

export interface RequestContextProps {
  correlationId: string;
}
