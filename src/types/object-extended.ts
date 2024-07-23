import { IObject } from 'razomy.js/interfaces/i-object';
import {GuidFactory} from 'razomy.js/id/guid-factory';

export abstract class ObjectExtended implements IObject {

  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  };
}