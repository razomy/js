
import { PositionAttribute } from '../../attributes/position-attribute.js';
import { BorderStyle } from '../../attributes/styles/border-style.js';
import { FillStyle } from '../../attributes/fill-style.js';
import { RectangleShape } from './rectangle-shape.js';
import { HexParser } from '../../../platforms/web/svg/codecs/color/hex-parser.js';

export class RectangleRender {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
  }

  render(node: RectangleShape): void {
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
