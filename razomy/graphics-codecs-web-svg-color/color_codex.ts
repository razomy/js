import * as graphicsCodecsWebSvgColor from '@razomy/graphics-codecs-web-svg-color';

/**
 * @Source https://github.com/fabricjs/js/blob/master/src/color.class
 */
export class ColorCodex {
  /**
   * @private
   * @param {String|Array} color Color value to parse
   */
  public static tryParsingColor(color: string): graphicsCodecsWebSvgColor.Color {
    let source: number[] | null = null;

    if (graphicsCodecsWebSvgColor.SvgColorParser.isSvgColor(color as graphicsCodecsWebSvgColor.SvgColorKeys)) {
      color = graphicsCodecsWebSvgColor.SvgColorParser.colorNameMap[color as graphicsCodecsWebSvgColor.SvgColorKeys];
    }

    if (color === 'transparent') {
      source = [255, 255, 255, 0];
    }

    if (!source) {
      source = graphicsCodecsWebSvgColor.HexParser.sourceFromHex(color);
    }
    if (!source) {
      source = graphicsCodecsWebSvgColor.RgbaParser.sourceFromRgb(color);
    }
    if (!source) {
      source = graphicsCodecsWebSvgColor.HslaParser.sourceFromHsl(color);
    }
    if (!source) {
      //if color is not recognized, let's make it black as the canvas does
      source = [0, 0, 0, 1];
    }

    return this.fromSource(source as any);
  }

  /**
   * Returns a new color object when given a color in array representation (ex: [200, 100, 100, 0.5])
   * @static
   * @memberOf Color
   * @param {Array} source
   * @return {graphicsCodecsWebSvgColor.Color}
   */
  public static fromSource(source: number[]): graphicsCodecsWebSvgColor.Color {
    const oColor = new graphicsCodecsWebSvgColor.Color();
    oColor.setSource(source);
    return oColor;
  }
}
