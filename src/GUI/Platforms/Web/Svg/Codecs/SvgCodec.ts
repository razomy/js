import { ICodec } from '../../../../../Interfaces/ICodec.js';
import { SizeAttribute } from '../../../../Graphics/Attributes/SizeAttribute.js';
import { ViewportElement } from '../../../../Graphics/Elements/ViewportElement.js';
import { EncodeNodeFactory } from './EncodeNodeFactory.js';

export class SvgCodec implements ICodec<ViewportElement, SVGElement> {
  constructor(private encodeNodeFactory: EncodeNodeFactory) {
  }

  public encode(node: ViewportElement): SVGElement {
    const el = this.encodeNodeFactory.create<SVGElement>('svg');
    el.setAttribute('width', node.getBy(SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(SizeAttribute).height + '');
    return el;
  }

  public decode(value: SVGElement): ViewportElement {
    const viewportElement = new ViewportElement();
    viewportElement.replace(new SizeAttribute(
      +value.attributes.getNamedItem('height')!.value,
      +value.attributes.getNamedItem('width')!.value
    ));

    return viewportElement;
  }

}
