
import { StyleAttribute } from './style-attribute.js';
import { Color } from '../../platforms/web/svg/codecs/color/color.js';

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
