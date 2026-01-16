import { Codec } from 'razomy.codec/codec';
import { PositionAttribute } from 'razomy.graphics/attributes/position_attribute';
import { SizeAttribute } from 'razomy.graphics/attributes/size_attribute';
import { BorderStyle } from 'razomy.graphics/styles/border_style';
import { FillStyle } from 'razomy.graphics/styles/fill_style';
import { RectangleRoundStyle } from 'razomy.graphics/shapes/rectangle_round_style';
import { RectangleShape } from 'razomy.graphics/shapes/rectangle_shape';
import { ColorCodex } from 'razomy.graphics/codecs/web/svg/color/color_codex';
import { HexParser } from 'razomy.graphics/codecs/web/svg/color/hex_parser';
import { EncodeNodeFactory }  from 'razomy.graphics/codecs/web/svg/codecs/encode_node_factory';

export class RectangleCodec implements Codec<RectangleShape, SVGRectElement> {

  constructor(private encodeNodeFactory: EncodeNodeFactory) {
  }

  public encode(node: RectangleShape): SVGRectElement {
    const el = this.encodeNodeFactory.create<SVGRectElement>('rect');
    el.setAttribute('x', node.get_by(PositionAttribute).x + '');
    el.setAttribute('y', node.get_by(PositionAttribute).y + '');
    el.setAttribute('width', node.get_by(SizeAttribute).width + '');
    el.setAttribute('height', node.get_by(SizeAttribute).height + '');
    el.setAttribute('fill', HexParser.to_hex(node.get_by(FillStyle).color.get_source()));
    el.setAttribute('stroke', HexParser.to_hex(node.get_by(BorderStyle).color.get_source()));
    el.setAttribute('stroke-width', node.get_by(BorderStyle).width + '');
    el.setAttribute('rx', node.get_by(RectangleRoundStyle).bottom_right + '');
    el.setAttribute('ry', node.get_by(RectangleRoundStyle).bottom_right + '');

    return el;
  };

  public decode(value: SVGRectElement): RectangleShape {
    const rectangle_shape = new RectangleShape();
    function get_number_attribute (key: string, def: number) : number {
            const atr = value.getAttribute(key);
            return atr ? +atr : def;
          }

    // Todo: ELement view
    rectangle_shape.replace(new SizeAttribute(
      value.height.baseVal.value,
      value.width.baseVal.value
    ));

    // Todo: ELement view
    rectangle_shape.replace(new PositionAttribute(
      value.x.baseVal.value,
      value.y.baseVal.value
    ));

    // Todo: ELement view
    // ResourceCollection

    rectangle_shape.replace(new FillStyle(
      ColorCodex.try_parsing_color(value.getAttribute('fill') || '#000')
    ));

    rectangle_shape.replace(new BorderStyle(
      ColorCodex.try_parsing_color(value.getAttribute('stroke') || '#000'),
      get_number_attribute('stroke-width', 1)
    ));

    rectangle_shape.replace(new RectangleRoundStyle(
      get_number_attribute('rx', 0)
    ));

    return rectangle_shape;
  }
}
