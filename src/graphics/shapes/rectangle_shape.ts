import { BorderStyle } from 'razomy.js/graphics/styles/border_style';
import { RectangleRoundStyle }  from 'razomy.js/graphics/shapes/rectangle_round_style';
import { ShapeElement }  from 'razomy.js/graphics/shapes/shape_element';
import {FillStyle} from 'razomy.js/graphics/styles/fill_style';

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
