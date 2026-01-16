import { Color }  from 'razomy.graphics/codecs/web/svg/color/color';
import { HexParser }  from 'razomy.graphics/codecs/web/svg/color/hex_parser';
import { HslaParser }  from 'razomy.graphics/codecs/web/svg/color/hsla_parser';
import { RgbaParser }  from 'razomy.graphics/codecs/web/svg/color/rgba_parser';
import {
  SvgColorKeys,
  SvgColorParser
}  from 'razomy.graphics/codecs/web/svg/color/svg_color_parser';


/**
 * @Source https://github.com/fabricjs/js/blob/master/src/color.class
 */
export class ColorCodex {

  /**
   * @private
   * @param {String|Array} color Color value to parse
   */
  public static try_parsing_color(color: string): Color {
    let source: number[] | null = null;

    if (SvgColorParser.is_svg_color(color as SvgColorKeys)) {
      color = SvgColorParser.color_name_map[color as SvgColorKeys];
    }

    if (color === 'transparent') {
      source = [255, 255, 255, 0];
    }

    if (!source) {
      source = HexParser.source_from_hex(color);
    }
    if (!source) {
      source = RgbaParser.source_from_rgb(color);
    }
    if (!source) {
      source = HslaParser.source_from_hsl(color);
    }
    if (!source) {
      //if color is not recognized, let's make it black as the canvas does
      source = [0, 0, 0, 1];
    }

    return  this.from_source(source as any);
  }


  /**
   * Returns a new color object when given a color in array representation (ex: [200, 100, 100, 0.5])
   * @static
   * @memberOf Color
   * @param {Array} source
   * @return {Color}
   */
  public static from_source(source: number[]): Color {
    const o_color = new Color();
    o_color.set_source(source);
    return o_color;
  };

}
