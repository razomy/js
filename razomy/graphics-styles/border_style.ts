import * as graphicsAttributes from "@razomy/graphics-attributes";
import * as graphicsCodecsWebSvgColor from "@razomy/graphics-codecs-web-svg-color";

export class BorderStyle extends graphicsAttributes.StyleAttribute {
  public color: graphicsCodecsWebSvgColor.Color;
  public width: number;

  constructor(color?: graphicsCodecsWebSvgColor.Color, width?: number) {
    super();
    this.color = color || new graphicsCodecsWebSvgColor.Color();
    this.width = width || 0;
  }
}
