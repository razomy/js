import { Color }  from 'razomy.js/graphics/codecs/web/svg/color/color';

export class RgbaParser {
  /**
   * Regex matching color in RGB or RGBA formats (ex: rgb(0, 0, 0), rgba(255, 100, 10, 0.5), rgba( 255 , 100 , 10 , 0.5 ), rgb(1,1,1), rgba(100%, 60%, 10%, 0.5))
   * @static
   * @field
   * @memberOf Color
   */
    // eslint-disable-next-line max-len
  public static readonly reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i;


  /**
   * Returns color representation in RGB format
   * @static
   * @return {String} ex: rgb(0-255,0-255,0-255)
   */
  public static toRgb(source: [number, number, number]): string {
    return 'rgb(' + source[0] + ',' + source[1] + ',' + source[2] + ')';
  }

  /**
   * Returns color representation in RGBA format
   * @static
   * @return {String} ex: rgba(0-255,0-255,0-255,0-1)
   */
  public static toRgba(source: [number, number, number, number]): string {
    return 'rgba(' + source[0] + ',' + source[1] + ',' + source[2] + ',' + source[3] + ')';
  }

  /**
   * Returns new color object, when given a color in RGB format
   * @memberOf Color
   * @param {String} color Color value ex: rgb(0-255,0-255,0-255)
   * @return {Color}
   */
  public static fromRgb(color: string): Color {
    return (this.sourceFromRgb(color))as any;
  };

  /**
   * Returns array representation (ex: [100, 100, 200, 1]) of a color that's in RGB or RGBA format
   * @memberOf Color
   * @param {String} color Color value ex: rgb(0-255,0-255,0-255), rgb(0%-100%,0%-100%,0%-100%)
   * @return {Array} source
   */
  public static sourceFromRgb(color: string): number[] | null {
    var match = color.match(this.reRGBa);
    if (match) {
      var r = parseInt(match[1], 10) / (/%$/.test(match[1]) ? 100 : 1) * (/%$/.test(match[1]) ? 255 : 1),
        g = parseInt(match[2], 10) / (/%$/.test(match[2]) ? 100 : 1) * (/%$/.test(match[2]) ? 255 : 1),
        b = parseInt(match[3], 10) / (/%$/.test(match[3]) ? 100 : 1) * (/%$/.test(match[3]) ? 255 : 1);

      return [
        parseInt(r as any, 10),
        parseInt(g as any, 10),
        parseInt(b as any, 10),
        match[4] ? parseFloat(match[4]) : 1
      ];
    }

    return null;
  };
}
