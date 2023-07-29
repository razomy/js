export class HexParser {
  /**
   * Regex matching color in HEX format (ex: #FF5544CC, #FF5555, 010155, aff)
   * @static
   * @field
   * @memberOf Color
   */
  public static readonly reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;

  /**
   * Returns color representation in HEX format
   * @return {String} ex: FF5555
   */
  public static toHex(source: number[]) {
    var r, g, b;

    r = source[0].toString(16);
    r = (r.length === 1) ? ('0' + r) : r;

    g = source[1].toString(16);
    g = (g.length === 1) ? ('0' + g) : g;

    b = source[2].toString(16);
    b = (b.length === 1) ? ('0' + b) : b;

    return '#' + r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
  }

  /**
   * Returns color representation in HEXA format
   * @return {String} ex: FF5555CC
   */
  public static toHexa(source: [number, number, number, number]) {
    var a;

    a = Math.round(source[3] * 255);
    a = a.toString(16);
    a = (a.length === 1) ? ('0' + a) : a;

    return HexParser.toHex(source as any) + a.toUpperCase();
  }

  /**
   * Returns new color object, when given a color in HEX format
   * @static
   * @memberOf Color
   * @param {String} color Color value ex: FF5555
   * @return {Color}
   */
  public static fromHex(color: string) {
    return (this.sourceFromHex(color));
  };

  /**
   * Returns array representation (ex: [100, 100, 200, 1]) of a color that's in HEX format
   * @static
   * @memberOf Color
   * @param {String} color ex: FF5555 or FF5544CC (RGBa)
   * @return {Array} source
   */
  public static sourceFromHex(color: string) {
    if (color.match(this.reHex)) {
      var value = color.slice(color.indexOf('#') + 1),
        isShortNotation = (value.length === 3 || value.length === 4),
        isRGBa = (value.length === 8 || value.length === 4),
        r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
        g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
        b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6),
        a = isRGBa ? (isShortNotation ? (value.charAt(3) + value.charAt(3)) : value.substring(6, 8)) : 'FF';

      return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16),
        parseFloat((parseInt(a, 16) / 255).toFixed(2))
      ];
    }

    return null;
  };
}
