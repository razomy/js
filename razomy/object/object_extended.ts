import {IObject} from '@razomy/object';
import {GuidFactory} from '@razomy/id';

export abstract class ObjectExtended implements IObject {

  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  };
}