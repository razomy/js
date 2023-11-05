import { IObjectConstructor } from './i-object.js';
import ObjectExtended from '../types/object-extended.js';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}