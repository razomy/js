import { ITextureFilter }  from 'razomy/graphics/codecs/web/canvas/textures/filters/i_texture_filter';

/**
 * Grayscale Filter
 * https://github.com/konvajs/konva
 @function
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Grayscale]);
 */
export class GrayscaleTextureFilter implements ITextureFilter {
  public filter(imageData: any): void {
    var data = imageData.data,
      len = data.length,
      i,
      brightness;

    for (i = 0; i < len; i += 4) {
      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      // red
      data[i] = brightness;
      // green
      data[i + 1] = brightness;
      // blue
      data[i + 2] = brightness;
    }
  };
}
