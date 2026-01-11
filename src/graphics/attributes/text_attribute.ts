import {AttributeResource} from 'razomy/resources/attribute_resource';
import {ArgumentException} from 'razomy/exceptions/argument_exception';

export class TextAttribute extends AttributeResource {
  public text: string;

  constructor();
  constructor(text: string)
  constructor(text: TextAttribute)
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

    throw new ArgumentException('unknown', args);
  }
}
