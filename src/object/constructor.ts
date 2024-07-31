import { IObjectConstructor }  from 'razomy.js/object/i_object';
import {ObjectExtended} from 'razomy.js/types/object_extended';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}