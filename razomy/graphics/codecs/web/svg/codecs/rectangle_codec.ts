import {Codec} from 'razomy.codec/codec';
import {PositionAttribute} from 'razomy.graphics/attributes/position_attribute';
import {SizeAttribute} from 'razomy.graphics/attributes/size_attribute';
import {BorderStyle} from 'razomy.graphics/styles/border_style';
import {FillStyle} from 'razomy.graphics/styles/fill_style';
import {RectangleRoundStyle} from 'razomy.graphics/shapes/rectangle_round_style';
import {RectangleShape} from 'razomy.graphics/shapes/rectangle_shape';
import {ColorCodex} from 'razomy.graphics/codecs/web/svg/color/color_codex';
import {HexParser} from 'razomy.graphics/codecs/web/svg/color/hex_parser';
import {EncodeNodeFactory} from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';

export class RectangleCodec implements Codec<RectangleShape, SVGRectElement> {

  constructor(private encodeNodeFactory: EncodeNodeFactory) {
  }

  public encode(node: RectangleShape): SVGRectElement {
    const el = this.encodeNodeFactory.create<SVGRectElement>('rect');
    el.setAttribute('x', node.getBy(PositionAttribute).x + '');
    el.setAttribute('y', node.getBy(PositionAttribute).y + '');
    el.setAttribute('width', node.getBy(SizeAttribute).width + '');
    el.setAttribute('height', node.getBy(SizeAttribute).height + '');
    el.setAttribute('fill', HexParser.toHex(node.getBy(FillStyle).color.getSource()));
    el.setAttribute('stroke', HexParser.toHex(node.getBy(BorderStyle).color.getSource()));
    el.setAttribute('stroke-width', node.getBy(BorderStyle).width + '');
    el.setAttribute('rx', node.getBy(RectangleRoundStyle).bottomRight + '');
    el.setAttribute('ry', node.getBy(RectangleRoundStyle).bottomRight + '');

    return el;
  };

  public decode(value: SVGRectElement): RectangleShape {
    const rectangleShape = new RectangleShape();

    function getNumberAttribute(key: string, def: number): number {
      const atr = value.getAttribute(key);
      return atr ? +atr : def;
    }

    // Todo: ELement view
    rectangleShape.replace(new SizeAttribute(
      value.height.baseVal.value,
      value.width.baseVal.value
    ));

    // Todo: ELement view
    rectangleShape.replace(new PositionAttribute(
      value.x.baseVal.value,
      value.y.baseVal.value
    ));

    // Todo: ELement view
    // ResourceCollection

    rectangleShape.replace(new FillStyle(
      ColorCodex.tryParsingColor(value.getAttribute('fill') || '#000')
    ));

    rectangleShape.replace(new BorderStyle(
      ColorCodex.tryParsingColor(value.getAttribute('stroke') || '#000'),
      getNumberAttribute('stroke-width', 1)
    ));

    rectangleShape.replace(new RectangleRoundStyle(
      getNumberAttribute('rx', 0)
    ));

    return rectangleShape;
  }
}
