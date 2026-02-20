import {BorderStyle, FillStyle} from '@razomy/graphics-styles';
import {RectangleRoundStyle, ShapeElement} from '@razomy/graphics-shapes';

export interface IRectangleShape {
}

export class RectangleShape extends ShapeElement {
  constructor() {
    super();
    this.resources[FillStyle.type] = new FillStyle();
    this.resources[RectangleRoundStyle.type] = new RectangleRoundStyle();
    this.resources[BorderStyle.type] = new BorderStyle();
  }
}
