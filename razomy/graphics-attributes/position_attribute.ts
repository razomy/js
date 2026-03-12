import * as resources from "@razomy/resources";
import * as exceptions from "@razomy/exceptions";

export interface IPositionAttribute {
  x: number;
  y: number;
}

export class PositionAttribute extends resources.AttributeResource implements IPositionAttribute {
  public x: number;
  public y: number;

  constructor();
  constructor(height: number, width: number);
  constructor(position: IPositionAttribute);
  constructor(...args: any) {
    super();

    if (args === undefined || args.length === 0) {
      this.x = 0;
      this.y = 0;
      return;
    }

    if (args.length === 2) {
      this.x = args[0];
      this.y = args[1];
      return;
    }

    if (args.length === 1 && args[0] instanceof PositionAttribute) {
      this.x = args[0].x;
      this.y = args[0].y;
      return;
    }

    throw new exceptions.ArgumentException('unknown', args);
  }
}
