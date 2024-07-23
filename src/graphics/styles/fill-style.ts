import {Color} from 'razomy.js/graphics/codecs/web/svg/color/color.js';
import {StyleAttribute} from 'razomy.js/graphics/attributes/style-attribute.js';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
