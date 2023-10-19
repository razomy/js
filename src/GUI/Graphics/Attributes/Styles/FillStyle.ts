import { StyleAttribute } from '../StyleAttribute.js';
import { Color } from '../../../Platforms/Web/Svg/Codecs/Color/Color.js';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
