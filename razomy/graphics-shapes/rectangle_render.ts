import {PositionAttribute} from '@razomy/graphics-attributes';
import {BorderStyle} from '@razomy/graphics-styles';
import {RectangleShape} from '@razomy/graphics-shapes';
import {HexParser} from '@razomy/graphics-codecs-web-svg-color';
import {FillStyle} from '@razomy/graphics-styles';

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
