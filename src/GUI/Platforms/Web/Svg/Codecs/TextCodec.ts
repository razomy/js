import { ICodec } from '../../../../../Interfaces/ICodec.js';
import { PositionAttribute } from '../../../../Graphics/Attributes/PositionAttribute.js';
import { SizeAttribute } from '../../../../Graphics/Attributes/SizeAttribute.js';
import { TextAttribute } from '../../../../Graphics/Attributes/TextAttribute.js';
import { TextElement } from '../../../../Graphics/Elements/TextElement.js';
import { EncodeNodeFactory } from './EncodeNodeFactory.js';

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
