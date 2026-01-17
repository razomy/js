import {StyleAttribute} from 'razomy.graphics/attributes/style_attribute';
import {Color} from 'razomy.graphics/codecs/web/svg/color/color';

export class BorderStyle extends StyleAttribute {
  public color: Color;
  public width: number;

  constructor(
    color?: Color,
    width?: number
  ) {
    super();
    this.color = color || new Color();
    this.width = width || 0;
  }
}
