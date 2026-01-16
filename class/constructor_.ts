import { IObjectConstructor }  from 'razomy.object/i_object';
import {ObjectExtended} from 'razomy.object';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}