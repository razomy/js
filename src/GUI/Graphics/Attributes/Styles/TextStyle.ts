import { StyleAttribute } from '../StyleAttribute';
import { Color } from '../../../Platforms/Web/Svg/Codecs/Color/Color';

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
