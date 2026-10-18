import * as graphicsAttributes from '@razomy/graphics-attributes';
import * as graphicsCodecsWebSvgColor from '@razomy/graphics-codecs-web-svg-color';

export class TextStyle extends graphicsAttributes.StyleAttribute {
  constructor(public color: graphicsCodecsWebSvgColor.Color, public size: number, public fontFamily: string) {
    super();
  }
}
