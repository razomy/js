import * as graphicsStyles from "@razomy/graphics-styles";
import * as graphicsShapes from "@razomy/graphics-shapes";

export interface IRectangleShape {}

export class RectangleShape extends graphicsShapes.ShapeElement {
  constructor() {
    super();
    this.resources[graphicsStyles.FillStyle.type] = new graphicsStyles.FillStyle();
    this.resources[graphicsShapes.RectangleRoundStyle.type] = new graphicsShapes.RectangleRoundStyle();
    this.resources[graphicsStyles.BorderStyle.type] = new graphicsStyles.BorderStyle();
  }
}
