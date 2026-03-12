import * as graphicsAttributes from '@razomy/graphics-attributes';

export class RectangleRoundStyle extends graphicsAttributes.StyleAttribute {
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
