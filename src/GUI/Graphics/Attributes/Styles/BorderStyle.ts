import { StyleAttribute } from '../StyleAttribute.js';
import { Color } from '../../../Platforms/Web/Svg/Codecs/Color/Color.js';

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
