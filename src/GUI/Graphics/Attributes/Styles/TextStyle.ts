import { StyleAttribute } from '../StyleAttribute.js';
import { Color } from '../../../Platforms/Web/Svg/Codecs/Color/Color.js';

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
