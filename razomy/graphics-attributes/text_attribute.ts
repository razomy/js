import * as resources from "@razomy/resources";
import * as exceptions from "@razomy/exceptions";

export class TextAttribute extends resources.AttributeResource {
  public text: string;

  constructor();
  constructor(text: string);
  constructor(text: TextAttribute);
  constructor(...args: any) {
    super();

    if (args === undefined) {
      this.text = '';
      return;
    }

    if (args.length === 1 && typeof args[0] === 'string') {
      this.text = args[0];
      return;
    }

    if (args.length === 1 && args[0] instanceof TextAttribute) {
      this.text = args[0].text;
      return;
    }

    throw new exceptions.ArgumentException('unknown', args);
  }
}
