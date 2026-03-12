import * as graphicsCodecsWebSvgCodecs from "@razomy/graphics-codecs-web-svg-codecs";
import * as abstracts from "@razomy/abstracts";
import * as graphicsAttributes from "@razomy/graphics-attributes";
import * as graphicsElements from "@razomy/graphics-elements";

export class TextCodec implements abstracts.patterns.Codec<graphicsElements.TextElement, SVGTextElement> {
  constructor(private encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory) {}

  public encode(node: graphicsElements.TextElement): SVGTextElement {
    const el = this.encodeNodeFactory.create<SVGTextElement>('text');
    el.setAttribute('x', node.getBy(graphicsAttributes.PositionAttribute).x + '');
    el.setAttribute('y', node.getBy(graphicsAttributes.PositionAttribute).x + '');
    el.setAttribute('width', node.getBy(graphicsAttributes.SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(graphicsAttributes.SizeAttribute).height + '');
    return el;
  }

  public decode(value: SVGTextElement): graphicsElements.TextElement {
    const textElement = new graphicsElements.TextElement();
    // textElement.replace(new SizeAttribute(
    //   value,
    //   value.width.baseVal.value
    // ));

    // textElement.replace(new PositionAttribute(
    //   value.x.baseVal.value,
    //   value.y.baseVal.value
    // ));

    textElement.replace(new graphicsAttributes.TextAttribute(value.textContent || ''));

    return textElement;
  }
}
