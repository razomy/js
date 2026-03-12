import type { IObjectConstructor } from './i_object';
import * as object_ from "@razomy/object";

export interface Constructor<T extends object_.ObjectExtended> extends IObjectConstructor {
  new (...args: any[]): T;
}
