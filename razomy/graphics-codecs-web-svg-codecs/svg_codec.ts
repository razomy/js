import * as graphicsCodecsWebSvgCodecs from "@razomy/graphics-codecs-web-svg-codecs";
import * as abstracts from "@razomy/abstracts";
import * as graphicsAttributes from "@razomy/graphics-attributes";
import * as graphicsElements from "@razomy/graphics-elements";

export class SvgCodec implements abstracts.patterns.Codec<graphicsElements.ViewportElement, SVGElement> {
  constructor(private encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory) {}

  public encode(node: graphicsElements.ViewportElement): SVGElement {
    const el = this.encodeNodeFactory.create<SVGElement>('svg');
    el.setAttribute('width', node.getBy(graphicsAttributes.SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(graphicsAttributes.SizeAttribute).height + '');
    return el;
  }

  public decode(value: SVGElement): graphicsElements.ViewportElement {
    const viewportElement = new graphicsElements.ViewportElement();
    viewportElement.replace(
      new graphicsAttributes.SizeAttribute(
        +value.attributes.getNamedItem('height')!.value,
        +value.attributes.getNamedItem('width')!.value,
      ),
    );

    return viewportElement;
  }
}
