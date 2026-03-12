import type { IObject } from '@razomy/abstracts/domains';
import { GuidFactory } from '@razomy/random';

export abstract class ObjectExtended implements IObject {
  public readonly id: string = new GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  }
}
