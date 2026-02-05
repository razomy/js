import {ITextureFilter} from '@razomy/graphics.codecs.web.canvas.textures.filters';

/**
 * Noise Filter. Randomly adds or substracts to the color channels
 * https://github.com/konvajs/konva
 @function
 * @name Noise
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @author ippo615
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Noise]);
 * node.noise(0.8);
 */
export class NoiseTextureFilter implements ITextureFilter {
  constructor(
    /**
     * get/set noise amount.  Must be a value between 0 and 1. Use with {@link Konva.Filters.Noise} filter.
     * @name Konva.Node#noise
     * @method
     * @param {Number} noise
     * @returns {Number}
     */
    public noise = 0.2
  ) {
  }

  public filter(imageData: any): void {
    var amount = this.noise * 255,
      data = imageData.data,
      nPixels = data.length,
      half = amount / 2,
      i;

    for (i = 0; i < nPixels; i += 4) {
      data[i + 0] += half - 2 * half * Math.random();
      data[i + 1] += half - 2 * half * Math.random();
      data[i + 2] += half - 2 * half * Math.random();
    }
  };
}

