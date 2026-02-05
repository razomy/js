import {Color} from '@razomy/graphics.codecs.web.svg.color';
import {StyleAttribute} from '@razomy/graphics.attributes';

export class FillStyle extends StyleAttribute {
  public color: Color;

  constructor(
    color?: Color
  ) {
    super();
    this.color = color || new Color();
  }
}
