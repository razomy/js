import { EncodeNodeFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/encode-node-factory';
import { ICodec } from 'razomy.js/codec/i-codec';
import {PositionAttribute} from 'razomy.js/graphics/attributes/position-attribute';
import {SizeAttribute} from 'razomy.js/graphics/attributes/size-attribute';
import {TextAttribute} from 'razomy.js/graphics/attributes/text-attribute';
import {TextElement} from 'razomy.js/graphics/elements/text-element';

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
