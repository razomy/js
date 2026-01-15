
export class HexParser {
  /**
   * Regex matching color in HEX format (ex: #FF5544CC, #FF5555, 010155, aff)
   * @static
   * @field
   * @memberOf Color
   */
  public static readonly re_hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;

  /**
   * Returns color representation in HEX format
   * @return {String} ex: FF5555
   */
  public static to_hex(source: number[]): string {
    const [r, g, b] = source.map(component => {
      const hex_component = component.toString(16);
      return hex_component.length === 1 ? '0' + hex_component : hex_component;
    });

    return '#' + r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
  }

  /**
   * Returns color representation in HEXA format
   * @return {String} ex: FF5555CC
   */
  public static to_hexa(source: [number, number, number, number]): string {
    const a = Math.round(source[3] * 255).toString(16);
    const alpha_component = a.length === 1 ? '0' + a : a;

    return HexParser.to_hex(source) + alpha_component.toUpperCase();
  }

  /**
   * Returns new color object, when given a color in HEX format
   * @static
   * @memberOf Color
   * @param {String} color Color value ex: FF5555
   * @return {Color}
   */
  public static from_hex(color: string): any {
    return this.source_from_hex(color);
  }

  /**
   * Returns array representation (ex: [100, 100, 200, 1]) of a color that's in HEX format
   * @static
   * @memberOf Color
   * @param {String} color ex: FF5555 or FF5544CC (RGBa)
   * @return {Array} source
   */
  public static source_from_hex(color: string): [number, number, number, number] | null {
    if (color.match(this.re_hex)) {
      const value = color.slice(color.indexOf('#') + 1);
      const is_short_notation = value.length === 3 || value.length === 4;
      const is_rgba = value.length === 8 || value.length === 4;
      const r = is_short_notation ? value.charAt(0) + value.charAt(0) : value.substring(0, 2);
      const g = is_short_notation ? value.charAt(1) + value.charAt(1) : value.substring(2, 4);
      const b = is_short_notation ? value.charAt(2) + value.charAt(2) : value.substring(4, 6);
      const a = is_rgba ? (is_short_notation ? value.charAt(3) + value.charAt(3) : value.substring(6, 8)) : 'FF';

      return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16),
        parseFloat((parseInt(a, 16) / 255).toFixed(2))
      ];
    }

    return null;
  }
}
