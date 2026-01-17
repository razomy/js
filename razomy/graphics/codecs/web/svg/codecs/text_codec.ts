import {EncodeNodeFactory} from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';
import {Codec} from 'razomy.codec/codec';
import {PositionAttribute} from 'razomy.graphics/attributes/position_attribute';
import {SizeAttribute} from 'razomy.graphics/attributes/size_attribute';
import {TextAttribute} from 'razomy.graphics/attributes/text_attribute';
import {TextElement} from 'razomy.graphics/elements/text_element';

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
