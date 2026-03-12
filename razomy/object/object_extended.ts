import * as object_ from '@razomy/object';
import * as random from '@razomy/random';

export abstract class ObjectExtended implements object_.IObject {
  public readonly id: string = new random.GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  }
}
