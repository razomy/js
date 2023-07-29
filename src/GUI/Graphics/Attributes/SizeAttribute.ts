import AttributeResource from '../../../Resources/AttributeResource';
import ArgumentException from '../../../Exceptions/ArgumentException';

export interface ISizeResource {
  height: number;
  width: number;
}

export class SizeAttribute extends AttributeResource implements ISizeResource {
  public height: number;
  public width: number;

  constructor();
  constructor(height: number, width: number)
  constructor(size: ISizeResource);
  constructor(...args: any) {
    super();

    if (args === undefined || args.length === 0) {
      this.height = 0;
      this.width = 0;
      return;
    }

    if (args.length === 2) {
      this.height = args[0];
      this.width = args[1];
      return;
    }

    if (args.length === 1 && args[0] instanceof SizeAttribute) {
      this.height = args[0].height;
      this.width = args[0].width;
      return;
    }

    throw new ArgumentException();
  }
}
