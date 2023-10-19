import { IObjectConstructor } from './IObject.js';
import ObjectExtended from '../Types/ObjectExtended.js';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}
