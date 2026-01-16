
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export class Color {
  private source: number[];

  constructor();
  constructor(str: string);
  constructor(otherColor?: Color | string) {
    if (otherColor instanceof Color) {
      this.source = otherColor.get_source();
      return;
    }

    if (typeof otherColor === 'string') {
      throw new Error();
    }

    this.source = [0, 0, 0, 1];
  }

  /**
   * Overlays color with another color
   * @param {String|Color} otherColor
   * @return {Color} thisArg
   */
  overlay_with(otherColor: Color | string) {
    if (!(otherColor instanceof Color)) {
      otherColor = new Color(otherColor);
    }

    var result: number[] = [],
      alpha = this.get_alpha(),
      other_alpha = 0.5,
      source = this.get_source(),
      other_source = otherColor.get_source(), i;

    for (i = 0; i < 3; i++) {
      result.push(Math.round((source[i] * (1 - other_alpha)) + (other_source[i] * other_alpha)));
    }

    result[3] = alpha;
    this.set_source(result);
    return this;
  }


  /**
   * Returns source of this color (where source is an array representation; ex: [200, 200, 100, 1])
   * @return {Array}
   */
  get_source() {
    return this.source;
  }

  /**
   * Sets source of this color (where source is an array representation; ex: [200, 200, 100, 1])
   * @param {Array} source
   */
  set_source(source: number[]) {
    this.source = source;
  }

  /**
   * Gets value of alpha channel for this color
   * @return {Number} 0-1
   */
  get_alpha() {
    return this.get_source()[3];
  }

  /**
   * Sets value of alpha channel for this color
   * @param {Number} alpha Alpha value 0-1
   * @return {Color} thisArg
   */
  set_alpha(alpha: number) {
    var source = this.get_source();
    source[3] = alpha;
    this.set_source(source);
    return this;
  }


  /**
   * Transforms color to its grayscale representation
   * @return {Color} thisArg
   */
  to_grayscale() {
    var source = this.get_source(),
      average = parseInt((source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0), 10),
      current_alpha = source[3];
    this.set_source([average, average, average, current_alpha]);
    return this;
  }

  /**
   * Transforms color to its black and white representation
   * @param {Number} threshold
   * @return {Color} thisArg
   */
  to_black_white(threshold: number) {
    var source = this.get_source(),
      average = (source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0),
      current_alpha = source[3];

    threshold = threshold || 127;

    var average_i = (Number(average) < Number(threshold)) ? 0 : 255;
    this.set_source([average_i, average_i, average_i, current_alpha]);
    return this;
  }
}
