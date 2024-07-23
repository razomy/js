import { BorderStyle } from 'razomy.js/graphics/styles/border-style';
import { RectangleRoundStyle } from './rectangle-round-style';
import { ShapeElement } from './shape-element';
import {FillStyle} from 'razomy.js/graphics/styles/fill-style.js';

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
