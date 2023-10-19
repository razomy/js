import { ICodec } from '../../../../../Interfaces/ICodec.js';
import { PositionAttribute } from '../../../../Graphics/Attributes/PositionAttribute.js';
import { SizeAttribute } from '../../../../Graphics/Attributes/SizeAttribute.js';
import { BorderStyle } from '../../../../Graphics/Attributes/Styles/BorderStyle.js';
import { FillStyle } from '../../../../Graphics/Attributes/Styles/FillStyle.js';
import { RectangleRoundStyle } from '../../../../Graphics/Elements/Shapes/RectangleRoundStyle.js';
import { RectangleShape } from '../../../../Graphics/Elements/Shapes/RectangleShape.js';
import { ColorCodex } from './Color/ColorCodex.js';
import { HexParser } from './Color/HexParser.js';
import { EncodeNodeFactory } from './EncodeNodeFactory.js';

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
      ColorCodex._tryParsingColor(value.getAttribute('fill') || '#000')
    ));

    rectangleShape.replace(new BorderStyle(
      ColorCodex._tryParsingColor(value.getAttribute('stroke') || '#000'),
      getNumberAttribute('stroke-width', 1)
    ));

    rectangleShape.replace(new RectangleRoundStyle(
      getNumberAttribute('rx', 0)
    ));

    return rectangleShape;
  }
}
