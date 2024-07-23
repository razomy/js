
import { StyleAttribute } from 'razomy.js/graphics/attributes/style-attribute';

export class RectangleRoundStyle extends StyleAttribute {
  public topLeft: number;
  public topRight: number;
  public bottomLeft: number;
  public bottomRight: number;

  constructor(radius?: number) {
    super();
    this.topLeft = radius || 0;
    this.topRight = radius || 0;
    this.bottomLeft = radius || 0;
    this.bottomRight = radius || 0;
  }
}
