import { PositionAttribute } from '../../../../graphics/attributes/position-attribute.js';
import { SizeAttribute } from '../../../../graphics/attributes/size-attribute.js';
import { TextAttribute } from '../../../../graphics/attributes/text-attribute.js';
import { TextElement } from '../../../../graphics/elements/text-element.js';
import { EncodeNodeFactory } from './encode-node-factory.js';
import { ICodec } from '../../../../../codec/i-codec.js';

export class TextCodec implements ICodec<TextElement, SVGTextElement> {

  constructor(private encodeNodeFactory: EncodeNodeFactory) {
  }

  public encode(node: TextElement): SVGTextElement {
    const el = this.encodeNodeFactory.create<SVGTextElement>('text');
    el.setAttribute('x', node.getBy(PositionAttribute).x + '');
    el.setAttribute('y', node.getBy(PositionAttribute).x + '');
    el.setAttribute('width', node.getBy(SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(SizeAttribute).height + '');
    return el;
  };

  public decode(value: SVGTextElement): TextElement {
    const textElement = new TextElement();
    // textElement.replace(new SizeAttribute(
    //   value,
    //   value.width.baseVal.value
    // ));

    // textElement.replace(new PositionAttribute(
    //   value.x.baseVal.value,
    //   value.y.baseVal.value
    // ));

    textElement.replace(new TextAttribute(value.textContent || ''));

    return textElement;
  }
}
