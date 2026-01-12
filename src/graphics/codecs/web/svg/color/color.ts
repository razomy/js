
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export class Color {
  private _source: number[];

  constructor();
  constructor(str: string);
  constructor(otherColor?: Color | string) {
    if (otherColor instanceof Color) {
      this._source = otherColor.getSource();
      return;
    }

    if (typeof otherColor === 'string') {
      throw new Error();
    }

    this._source = [0, 0, 0, 1];
  }

  /**
   * Overlays color with another color
   * @param {String|Color} otherColor
   * @return {Color} thisArg
   */
  overlayWith(otherColor: Color | string) {
    if (!(otherColor instanceof Color)) {
      otherColor = new Color(otherColor);
    }

    var result: number[] = [],
      alpha = this.getAlpha(),
      other_alpha = 0.5,
      source = this.getSource(),
      other_source = otherColor.getSource(), i;

    for (i = 0; i < 3; i++) {
      result.push(Math.round((source[i] * (1 - other_alpha)) + (other_source[i] * other_alpha)));
    }

    result[3] = alpha;
    this.setSource(result);
    return this;
  }


  /**
   * Returns source of this color (where source is an array representation; ex: [200, 200, 100, 1])
   * @return {Array}
   */
  getSource() {
    return this._source;
  }

  /**
   * Sets source of this color (where source is an array representation; ex: [200, 200, 100, 1])
   * @param {Array} source
   */
  setSource(source: number[]) {
    this._source = source;
  }

  /**
   * Gets value of alpha channel for this color
   * @return {Number} 0-1
   */
  getAlpha() {
    return this.getSource()[3];
  }

  /**
   * Sets value of alpha channel for this color
   * @param {Number} alpha Alpha value 0-1
   * @return {Color} thisArg
   */
  setAlpha(alpha: number) {
    var source = this.getSource();
    source[3] = alpha;
    this.setSource(source);
    return this;
  }


  /**
   * Transforms color to its grayscale representation
   * @return {Color} thisArg
   */
  toGrayscale() {
    var source = this.getSource(),
      average = parseInt((source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0), 10),
      current_alpha = source[3];
    this.setSource([average, average, average, current_alpha]);
    return this;
  }

  /**
   * Transforms color to its black and white representation
   * @param {Number} threshold
   * @return {Color} thisArg
   */
  toBlackWhite(threshold: number) {
    var source = this.getSource(),
      average = (source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0),
      current_alpha = source[3];

    threshold = threshold || 127;

    var average_i = (Number(average) < Number(threshold)) ? 0 : 255;
    this.setSource([average_i, average_i, average_i, current_alpha]);
    return this;
  }
}
