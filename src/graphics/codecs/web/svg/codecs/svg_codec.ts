import { EncodeNodeFactory }  from 'razomy/graphics/codecs/web/svg/codecs/encode_node_factory';
import { ICodec } from 'razomy/codec/i_codec';
import { SizeAttribute } from 'razomy/graphics/attributes/size_attribute';
import { ViewportElement } from 'razomy/graphics/elements/viewport_element';

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
    const viewport_element = new ViewportElement();
    viewport_element.replace(new SizeAttribute(
      +value.attributes.getNamedItem('height')!.value,
      +value.attributes.getNamedItem('width')!.value
    ));

    return viewport_element;
  }
}
