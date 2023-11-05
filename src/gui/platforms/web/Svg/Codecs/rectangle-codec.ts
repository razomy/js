
import { ICodec } from '../../../../../interfaces/i-codec.js';
import { PositionAttribute } from '../../../../graphics/attributes/position-attribute.js';
import { SizeAttribute } from '../../../../graphics/attributes/size-attribute.js';
import { BorderStyle } from '../../../../graphics/attributes/styles/border-style.js';
import { FillStyle } from '../../../../graphics/attributes/styles/FillStyle.js';
import { RectangleRoundStyle } from '../../../../graphics/elements/Shapes/rectangle-round-style.js';
import { RectangleShape } from '../../../../graphics/elements/Shapes/rectangle-shape.js';
import { ColorCodex } from './color/color-codex.js';
import { HexParser } from './color/hex-parser.js';
import { EncodeNodeFactory } from './encode-node-factory.js';

export class RectangleCodec implements ICodec<RectangleShape, SVGRectElement> {

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
    const getNumberAttribute = (key: string, def: number): number => {
      const atr = value.getAttribute(key);
      return atr ? +atr : def;
    };

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
