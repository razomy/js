import * as abstracts from '@razomy/abstracts';
import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as graphicsStyles from '@razomy/graphics-styles';
import * as graphicsShapes from '@razomy/graphics-shapes';
import * as graphicsCodecsWebSvgColor from '@razomy/graphics-codecs-web-svg-color';
import * as graphicsCodecsWebSvgCodecs from '@razomy/graphics-codecs-web-svg-codecs';

export class RectangleCodec implements abstracts.patterns.Codec<graphicsShapes.RectangleShape, SVGRectElement> {
  constructor(private encodeNodeFactory: graphicsCodecsWebSvgCodecs.EncodeNodeFactory) {}

  public encode(node: graphicsShapes.RectangleShape): SVGRectElement {
    const el = this.encodeNodeFactory.create<SVGRectElement>('rect');
    el.setAttribute('x', node.getBy(graphicsAttributes.PositionAttribute).x + '');
    el.setAttribute('y', node.getBy(graphicsAttributes.PositionAttribute).y + '');
    el.setAttribute('width', node.getBy(graphicsAttributes.SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(graphicsAttributes.SizeAttribute).height + '');
    el.setAttribute(
      'fill',
      graphicsCodecsWebSvgColor.HexParser.toHex(node.getBy(graphicsStyles.FillStyle).color.getSource()),
    );
    el.setAttribute(
      'stroke',
      graphicsCodecsWebSvgColor.HexParser.toHex(node.getBy(graphicsStyles.BorderStyle).color.getSource()),
    );
    el.setAttribute('stroke-width', node.getBy(graphicsStyles.BorderStyle).width + '');
    el.setAttribute('rx', node.getBy(graphicsShapes.RectangleRoundStyle).bottomRight + '');
    el.setAttribute('ry', node.getBy(graphicsShapes.RectangleRoundStyle).bottomRight + '');

    return el;
  }

  public decode(value: SVGRectElement): graphicsShapes.RectangleShape {
    const rectangleShape = new graphicsShapes.RectangleShape();

    function getNumberAttribute(key: string, def: number): number {
      const atr = value.getAttribute(key);
      return atr ? +atr : def;
    }

    // Todo: ELement view
    rectangleShape.replace(new graphicsAttributes.SizeAttribute(value.height.baseVal.value, value.width.baseVal.value));

    // Todo: ELement view
    rectangleShape.replace(new graphicsAttributes.PositionAttribute(value.x.baseVal.value, value.y.baseVal.value));

    // Todo: ELement view
    // ResourceCollection

    rectangleShape.replace(
      new graphicsStyles.FillStyle(
        graphicsCodecsWebSvgColor.ColorCodex.tryParsingColor(value.getAttribute('fill') || '#000'),
      ),
    );

    rectangleShape.replace(
      new graphicsStyles.BorderStyle(
        graphicsCodecsWebSvgColor.ColorCodex.tryParsingColor(value.getAttribute('stroke') || '#000'),
        getNumberAttribute('stroke-width', 1),
      ),
    );

    rectangleShape.replace(new graphicsShapes.RectangleRoundStyle(getNumberAttribute('rx', 0)));

    return rectangleShape;
  }
}
