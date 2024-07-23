import { EncodeNodeFactory } from './encode-node-factory.js';
import { ICodec } from '../../../../../codec/i-codec.js';
import { SizeAttribute } from '../../../../graphics/attributes/size-attribute.js';
import { ViewportElement } from '../../../../graphics/elements/viewport-element.js';

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
