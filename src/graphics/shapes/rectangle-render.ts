
import { PositionAttribute } from 'razomy.js/graphics/attributes/position-attribute';
import { BorderStyle } from 'razomy.js/graphics/styles/border-style';
import { RectangleShape } from './rectangle-shape';
import {HexParser} from 'razomy.js/graphics/codecs/web/svg/color/hex-parser.js';
import {FillStyle} from 'razomy.js/graphics/styles/fill-style.js';

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
