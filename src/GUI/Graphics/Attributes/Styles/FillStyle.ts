import { StyleAttribute } from '../StyleAttribute';
import { Color } from '../../../Platforms/Web/Svg/Codecs/Color/Color';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
