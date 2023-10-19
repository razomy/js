import { PositionAttribute } from '../../../../Graphics/Attributes/PositionAttribute.js';
import { BorderStyle } from '../../../../Graphics/Attributes/Styles/BorderStyle.js';
import { FillStyle } from '../../../../Graphics/Attributes/Styles/FillStyle.js';
import { RectangleShape } from '../../../../Graphics/Elements/Shapes/RectangleShape.js';
import { HexParser } from '../../Svg/Codecs/Color/HexParser.js';

export class RectangleRender {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
  }

  render(node: RectangleShape): void {
    // TODO: RectangleShape
    // ResourceCollection

    // TODO: RectangleRoundStyle

    // TODO: split
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.rect(
      node.getBy(PositionAttribute).x,
      node.getBy(PositionAttribute).y,
      node.width,
      node.height
    );

    this.ctx.fillStyle = HexParser.toHex(node.getBy(FillStyle).color.getSource());

    this.ctx.strokeStyle = HexParser.toHex(node.getBy(BorderStyle).color.getSource());
    this.ctx.lineWidth = node.getBy(BorderStyle).width;

    this.ctx.strokeRect(
      node.getBy(PositionAttribute).x,
      node.getBy(PositionAttribute).y,
      node.width,
      node.height
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}
