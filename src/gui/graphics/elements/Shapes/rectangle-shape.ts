
import { BorderStyle } from '../../attributes/styles/border-style.js';
import { FillStyle } from '../../attributes/fill-style.js';
import { RectangleRoundStyle } from './rectangle-round-style.js';
import { ShapeElement } from './shape-element.js';

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
