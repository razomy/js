
import { StyleAttribute } from '../style-attribute.js';
import { Color } from '../../../platforms/web/svg/codecs/color/color.js';

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
