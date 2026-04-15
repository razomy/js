import * as graphicsCodecsWebCanvasTexturesFilters from '@razomy/graphics-codecs-web-canvas-textures-filters';

/**
 * Invert Filter
 * https://github.com/konvajs/konva
 * @function
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Invert]);
 */

export class InvertTextureFilter implements graphicsCodecsWebCanvasTexturesFilters.ITextureFilter {
  public filter(imageData: any): void {
    let data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] = 255 - data[i];
      // green
      data[i + 1] = 255 - data[i + 1];
      // blue
      data[i + 2] = 255 - data[i + 2];
    }
  }
}
