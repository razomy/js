import {Color} from 'razomy.graphics/codecs/web/svg/color/color';
import {StyleAttribute} from 'razomy.graphics/attributes/style_attribute';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
