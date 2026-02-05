import {BorderStyle} from '@razomy/graphics.styles';
import {RectangleRoundStyle} from '@razomy/graphics.shapes';
import {ShapeElement} from '@razomy/graphics.shapes';
import {FillStyle} from '@razomy/graphics.styles';

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
