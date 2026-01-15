import { PositionAttribute } from 'razomy.graphics/attributes/position_attribute';
import { BorderStyle } from 'razomy.graphics/styles/border_style';
import { RectangleShape }  from 'razomy.graphics/shapes/rectangle_shape';
import {HexParser} from 'razomy.graphics/codecs/web/svg/color/hex_parser';
import {FillStyle} from 'razomy.graphics/styles/fill_style';

export class RectangleRender {
  constructor(
    private ctx: CanvasRenderingContext2D
  ) {
  }

  render(node: RectangleShape): void {
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.rect(
      node.get_by(PositionAttribute).x,
      node.get_by(PositionAttribute).y,
      node.width,
      node.height
    );

    this.ctx.fillStyle = HexParser.to_hex(node.get_by(FillStyle).color.get_source());

    this.ctx.strokeStyle = HexParser.to_hex(node.get_by(BorderStyle).color.get_source());
    this.ctx.lineWidth = node.get_by(BorderStyle).width;

    this.ctx.strokeRect(
      node.get_by(PositionAttribute).x,
      node.get_by(PositionAttribute).y,
      node.width,
      node.height
    );

    this.ctx.fill();
    this.ctx.restore();
  }
}
