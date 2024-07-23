
import { StyleAttribute } from './style-attribute.js';
import { Color } from '../ctx/web/svg/codecs/color/color.js';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
