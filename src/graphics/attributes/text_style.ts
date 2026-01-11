import { StyleAttribute }  from 'razomy/graphics/attributes/style_attribute';
import {Color} from 'razomy/graphics/codecs/web/svg/color/color';

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
