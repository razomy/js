import { PositionAttribute } from '../../../../../GUI/Graphics/Attributes/PositionAttribute';
import { BorderStyle } from '../../../../../GUI/Graphics/Attributes/Styles/BorderStyle';
import { FillStyle } from '../../../../../GUI/Graphics/Attributes/Styles/FillStyle';
import { RectangleShape } from '../../../../../GUI/Graphics/Elements/Shapes/RectangleShape';
import { HexParser } from '../../../../../GUI/Platforms/Web/Svg/Codecs/Color/HexParser';

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
