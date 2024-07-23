
import { StyleAttribute } from './style-attribute';
import {Color} from "razomy.js/graphics/codecs/web/svg/color/color";

export class TextStyle extends StyleAttribute {
  constructor(
    public color: Color,
    public size: number,
    public fontFamily: string
  ) {
    super();
  }
}
