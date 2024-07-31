import { IObjectConstructor }  from 'razomy.js/interfaces/i-object';
import {ObjectExtended} from 'razomy.js/types/object-extended';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}