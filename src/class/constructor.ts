import { IObjectConstructor }  from 'razomy/object/i_object';
import {ObjectExtended} from 'razomy/types/object_extended';

export interface Constructor<T extends ObjectExtended> extends IObjectConstructor {
  new(...args: any[]): T;
}