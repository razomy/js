import { BorderStyle } from '../../Attributes/Styles/BorderStyle.js';
import { FillStyle } from '../../Attributes/Styles/FillStyle.js';
import { RectangleRoundStyle } from './RectangleRoundStyle.js';
import { ShapeElement } from './ShapeElement.js';

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
