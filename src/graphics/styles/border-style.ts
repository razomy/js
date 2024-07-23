
import { StyleAttribute } from 'razomy.js/graphics/attributes/style-attribute';
import {Color} from 'razomy.js/graphics/codecs/web/svg/color/color.js';

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
