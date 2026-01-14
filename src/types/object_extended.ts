import { IObject } from 'razomy.object/i_object';
import {GuidFactory} from 'razomy.id/guid_factory';

export abstract class ObjectExtended implements IObject {

  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  };
}