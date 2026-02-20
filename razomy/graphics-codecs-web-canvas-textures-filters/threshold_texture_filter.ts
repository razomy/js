import type {ITextureFilter} from './i_texture_filter';

/**
 * Threshold Filter. Pushes any value above the mid point to
 *  the max and any value below the mid point to the min.
 *  This affects the alpha channel.
 * https://github.com/konvajs/konva
 @function
 * @name Threshold
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @author ippo615
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Threshold]);
 * node.threshold(0.1);
 */
export class ThresholdTextureFilter implements ITextureFilter {
  constructor(
    /**
     * get/set threshold.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Threshold} or {@link Konva.Filters.Mask} filter.
     * @name threshold
     * @method
     * @memberof Konva.Node.prototype
     * @param {Number} threshold
     * @returns {Number}
     */
    public threshold = 0.5
  ) {
  }

  public filter(imageData: any): void {
    var level = this.threshold * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 1) {
      data[i] = data[i] < level ? 0 : 255;
    }
  };
}

