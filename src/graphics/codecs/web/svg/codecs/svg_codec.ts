import { EncodeNodeFactory }  from 'razomy.js/graphics/codecs/web/svg/codecs/encode_node_factory';
import { ICodec } from 'razomy.js/codec/i_codec';
import { SizeAttribute } from 'razomy.js/graphics/attributes/size_attribute';
import { ViewportElement } from 'razomy.js/graphics/elements/viewport_element';

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
