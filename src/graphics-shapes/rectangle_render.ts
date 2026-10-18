import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as graphicsStyles from '@razomy/graphics-styles';
import * as graphicsShapes from '@razomy/graphics-shapes';
import * as graphicsCodecsWebSvgColor from '@razomy/graphics-codecs-web-svg-color';

export class RectangleRender {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(node: graphicsShapes.RectangleShape): void {
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.rect(
      node.getBy(graphicsAttributes.PositionAttribute).x,
      node.getBy(graphicsAttributes.PositionAttribute).y,
      node.width,
      node.height,
    );

    this.ctx.fillStyle = graphicsCodecsWebSvgColor.HexParser.toHex(
      node.getBy(graphicsStyles.FillStyle).color.getSource(),
    );

    this.ctx.strokeStyle = graphicsCodecsWebSvgColor.HexParser.toHex(
      node.getBy(graphicsStyles.BorderStyle).color.getSource(),
    );
    this.ctx.lineWidth = node.getBy(graphicsStyles.BorderStyle).width;

    this.ctx.strokeRect(
      node.getBy(graphicsAttributes.PositionAttribute).x,
      node.getBy(graphicsAttributes.PositionAttribute).y,
      node.width,
      node.height,
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}
