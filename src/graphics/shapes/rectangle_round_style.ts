import { StyleAttribute } from 'razomy/graphics/attributes/style_attribute';

export class RectangleRoundStyle extends StyleAttribute {
  public top_left: number;
  public top_right: number;
  public bottom_left: number;
  public bottom_right: number;

  constructor(radius?: number) {
    super();
    this.top_left = radius || 0;
    this.top_right = radius || 0;
    this.bottom_left = radius || 0;
    this.bottom_right = radius || 0;
  }
}
