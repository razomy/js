import { IObjectConstructor } from './IObject';
import ObjectExtended from '../Types/ObjectExtended';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}
