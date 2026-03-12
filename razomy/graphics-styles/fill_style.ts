import * as graphicsCodecsWebSvgColor from "@razomy/graphics-codecs-web-svg-color";
import * as graphicsAttributes from "@razomy/graphics-attributes";

export class FillStyle extends graphicsAttributes.StyleAttribute {
  public color: graphicsCodecsWebSvgColor.Color;

  constructor(color?: graphicsCodecsWebSvgColor.Color) {
    super();
    this.color = color || new graphicsCodecsWebSvgColor.Color();
  }
}
