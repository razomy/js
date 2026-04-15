import * as object_ from '@razomy/object';

export interface Constructor<T extends object_.ObjectExtended> extends object_.IObjectConstructor {
  new (...args: any[]): T;
}
