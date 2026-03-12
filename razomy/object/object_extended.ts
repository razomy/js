import * as abstracts from "@razomy/abstracts";
import * as random from "@razomy/random";

export abstract class ObjectExtended implements abstracts.domains.IObject {
  public readonly id: string = new random.GuidFactory().create();

  public static get type() {
    return this.name;
  }

  public get type() {
    return this.constructor.name;
  }
}
