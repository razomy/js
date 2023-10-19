import { IObject } from '../Interfaces/IObject.js';
import GuidFactory from '../Operations/GuidFactory.js';

export default abstract class ObjectExtended implements IObject {

  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  };
}
