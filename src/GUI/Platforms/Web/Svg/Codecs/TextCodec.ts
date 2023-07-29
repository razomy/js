import { ICodec } from '../../../../../Interfaces/ICodec';
import { PositionAttribute } from '../../../../../GUI/Graphics/Attributes/PositionAttribute';
import { SizeAttribute } from '../../../../../GUI/Graphics/Attributes/SizeAttribute';
import { TextAttribute } from '../../../../../GUI/Graphics/Attributes/TextAttribute';
import { TextElement } from '../../../../../GUI/Graphics/Elements/TextElement';
import { EncodeNodeFactory } from '../../../../../GUI/Platforms/Web/Svg/Codecs/EncodeNodeFactory';

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
