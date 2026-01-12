/*eslint-disable max-depth */
import { ITextureFilter }  from 'razomy/graphics/codecs/web/canvas/textures/filters/i_texture_filter';

/**
 * Pixelate Filter. Averages groups of pixels and redraws
 *  them as larger pixels
 * https://github.com/konvajs/konva
 @function
 * @name Pixelate
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @author ippo615
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Pixelate]);
 * node.pixelSize(10);
 */
export class PixelateTextureFilter implements ITextureFilter {

  constructor(
    /**
     * get/set pixel size. Use with {@link Konva.Filters.Pixelate} filter.
     * @name Konva.Node#pixelSize
     * @method
     * @param {Integer} pixelSize
     * @returns {Integer}
     */
    public pixelSize = 8
  ) {
  }

  public filter(imageData: any): void {
    var pixel_size = Math.ceil(this.pixelSize),
      width = imageData.width,
      height = imageData.height,
      x,
      y,
      i,
      //pixelsPerBin = pixelSize * pixelSize,
      red,
      green,
      blue,
      alpha,
      n_bins_x = Math.ceil(width / pixel_size),
      n_bins_y = Math.ceil(height / pixel_size),
      x_bin_start,
      x_bin_end,
      y_bin_start,
      y_bin_end,
      x_bin,
      y_bin,
      pixels_in_bin,
      data = imageData.data;

    if (pixel_size <= 0) {
      throw new Error('pixelSize value can not be <= 0');
      return;
    }

    for (x_bin = 0; x_bin < n_bins_x; x_bin += 1) {
      for (y_bin = 0; y_bin < n_bins_y; y_bin += 1) {
        // Initialize the color accumlators to 0
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;

        // Determine which pixels are included in this bin
        x_bin_start = x_bin * pixel_size;
        x_bin_end = x_bin_start + pixel_size;
        y_bin_start = y_bin * pixel_size;
        y_bin_end = y_bin_start + pixel_size;

        // Add all of the pixels to this bin!
        pixels_in_bin = 0;
        for (x = x_bin_start; x < x_bin_end; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = y_bin_start; y < y_bin_end; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            red += data[i + 0];
            green += data[i + 1];
            blue += data[i + 2];
            alpha += data[i + 3];
            pixels_in_bin += 1;
          }
        }

        // Make sure the channels are between 0-255
        red = red / pixels_in_bin;
        green = green / pixels_in_bin;
        blue = blue / pixels_in_bin;
        alpha = alpha / pixels_in_bin;

        // Draw this bin
        for (x = x_bin_start; x < x_bin_end; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = y_bin_start; y < y_bin_end; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            data[i + 0] = red;
            data[i + 1] = green;
            data[i + 2] = blue;
            data[i + 3] = alpha;
          }
        }
      }
    }
  };
}
