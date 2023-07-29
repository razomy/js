import { Color } from '../../../../../../GUI/Platforms/Web/Svg/Codecs/Color/Color';
import { HexParser } from '../../../../../../GUI/Platforms/Web/Svg/Codecs/Color/HexParser';
import { HslaParser } from '../../../../../../GUI/Platforms/Web/Svg/Codecs/Color/HslaParser';
import { RgbaParser } from '../../../../../../GUI/Platforms/Web/Svg/Codecs/Color/RgbaParser';
import {
  SvgColorKeys,
  SvgColorParser
} from '../../../../../../GUI/Platforms/Web/Svg/Codecs/Color/SvgColorParser';


/**
 * @Source https://github.com/fabricjs/js/blob/master/src/color.class.js
 */
export class ColorCodex {

  /**
   * @private
   * @param {String|Array} color Color value to parse
   */
  public static _tryParsingColor(color: string): Color {
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
      //if color is not recognize let's make black as canvas does
      source = [0, 0, 0, 1];
    }

   return  this.fromSource(source as any);
  }


  /**
   * Returns new color object, when given color in array representation (ex: [200, 100, 100, 0.5])
   * @static
   * @memberOf Color
   * @param {Array} source
   * @return {Color}
   */
  public static  fromSource(source: number[]): Color {
    var oColor = new Color();
    oColor.setSource(source);
    return oColor;
  };

}
