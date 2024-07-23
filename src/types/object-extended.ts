import { IObject } from '../interfaces/i-object.js';
import GuidFactory from '../id/guid-factory.js';

export default abstract class ObjectExtended implements IObject {

  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  };
}