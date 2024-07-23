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
import { ITextureFilter } from './ITextureFilter.js';

export default class InvertTextureFilter implements ITextureFilter {
  public filter(imageData: any): void {
    var data = imageData.data,
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
