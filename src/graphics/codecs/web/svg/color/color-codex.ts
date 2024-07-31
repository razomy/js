
import { Color }  from 'razomy.js/graphics/codecs/web/svg/color/color';
import { HexParser }  from 'razomy.js/graphics/codecs/web/svg/color/hex-parser';
import { HslaParser }  from 'razomy.js/graphics/codecs/web/svg/color/hsla-parser';
import { RgbaParser }  from 'razomy.js/graphics/codecs/web/svg/color/rgba-parser';
import {
  SvgColorKeys,
  SvgColorParser
}  from 'razomy.js/graphics/codecs/web/svg/color/svg-color-parser';


/**
 * @Source https://github.com/fabricjs/js/blob/master/src/color.class
 */
export class ColorCodex {

  /**
   * @private
   * @param {String|Array} color Color value to parse
   */
  public static tryParsingColor(color: string): Color {
    let source: number[] | null = null;

    if (SvgColorParser.isSvgColor(color as SvgColorKeys)) {
      color = SvgColorParser.colorNameMap[color as SvgColorKeys];
    }

    if (color === 'transparent') {
      source = [255, 255, 255, 0];
    }

    if (!source) {
      source = HexParser.sourceFromHex(color);
    }
    if (!source) {
      source = RgbaParser.sourceFromRgb(color);
    }
    if (!source) {
      source = HslaParser.sourceFromHsl(color);
    }
    if (!source) {
      //if color is not recognized, let's make it black as the canvas does
      source = [0, 0, 0, 1];
    }

    return  this.fromSource(source as any);
  }


  /**
   * Returns a new color object when given a color in array representation (ex: [200, 100, 100, 0.5])
   * @static
   * @memberOf Color
   * @param {Array} source
   * @return {Color}
   */
  public static fromSource(source: number[]): Color {
    const oColor = new Color();
    oColor.setSource(source);
    return oColor;
  };

}
