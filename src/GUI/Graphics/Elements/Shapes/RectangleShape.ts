import { BorderStyle } from '../../../../GUI/Graphics/Attributes/Styles/BorderStyle';
import { FillStyle } from '../../../../GUI/Graphics/Attributes/Styles/FillStyle';
import { RectangleRoundStyle } from '../../../../GUI/Graphics/Elements/Shapes/RectangleRoundStyle';
import { ShapeElement } from '../../../../GUI/Graphics/Elements/Shapes/ShapeElement';

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
