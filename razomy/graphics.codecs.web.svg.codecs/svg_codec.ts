import {EncodeNodeFactory} from '@razomy/graphics.codecs.web.svg.codecs';
import {Codec} from '@razomy/codec';
import {SizeAttribute} from '@razomy/graphics.attributes';
import {ViewportElement} from '@razomy/graphics.elements';

export class SvgCodec implements Codec<ViewportElement, SVGElement> {
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
