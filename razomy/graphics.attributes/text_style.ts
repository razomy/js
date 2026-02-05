import {StyleAttribute} from '@razomy/graphics.attributes';
import {Color} from '@razomy/graphics.codecs.web.svg.color';

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
