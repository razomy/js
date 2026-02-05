import {EncodeNodeFactory} from '@razomy/graphics.codecs.web.svg.codecs';
import {Codec} from '@razomy/codec';
import {PositionAttribute} from '@razomy/graphics.attributes';
import {SizeAttribute} from '@razomy/graphics.attributes';
import {TextAttribute} from '@razomy/graphics.attributes';
import {TextElement} from '@razomy/graphics.elements';

export class TextCodec implements Codec<TextElement, SVGTextElement> {

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
