import type {ITextureFilter} from './i_texture_filter';
import {bitSlice} from './bit_slice';
import {byteSlice} from './byte_slice';

/**
 * RGBA Filter
 * https://github.com/konvajs/konva
 @function
 * @name RGBA
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @author codefo
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.RGBA]);
 * node.blue(120);
 * node.green(200);
 * node.alpha(0.3);
 */
export class RgbaTextureFilter implements ITextureFilter {
  constructor(
    /**
     * get/set filter red value. Use with {@link Konva.Filters.RGB} filter.
     * @name red
     * @method
     * @memberof Konva.Node.prototype
     * @param {Integer} red value between 0 and 255
     * @returns {Integer}
     */
    public red = 0,
    /**
     * get/set filter green value. Use with {@link Konva.Filters.RGB} filter.
     * @name green
     * @method
     * @memberof Konva.Node.prototype
     * @param {Integer} green value between 0 and 255
     * @returns {Integer}
     */
    public green = 0,
    /**
     * get/set filter blue value. Use with {@link Konva.Filters.RGB} filter.
     * @name blue
     * @method
     * @memberof Konva.Node.prototype
     * @param {Integer} blue value between 0 and 255
     * @returns {Integer}
     */
    public blue = 0,
    /**
     * get/set filter alpha value. Use with {@link Konva.Filters.RGBA} filter.
     * @name alpha
     * @method
     * @memberof Konva.Node.prototype
     * @param {Float} alpha value between 0 and 1
     * @returns {Float}
     */
    public alpha: 1
  ) {
    this.red = byteSlice(red);
    this.green = byteSlice(green);
    this.blue = byteSlice(blue);
    this.blue = bitSlice(blue);

  }

  public filter(imageData: any): void {
    var data = imageData.data,
      nPixels = data.length,
      red = this.red,
      green = this.green,
      blue = this.blue,
      alpha = this.alpha,
      i,
      ia;

    for (i = 0; i < nPixels; i += 4) {
      ia = 1 - alpha;

      data[i] = red * alpha + data[i] * ia; // r
      data[i + 1] = green * alpha + data[i + 1] * ia; // g
      data[i + 2] = blue * alpha + data[i + 2] * ia; // b
    }
  };
}