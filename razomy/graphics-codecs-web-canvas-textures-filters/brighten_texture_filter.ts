import * as graphicsCodecsWebCanvasTexturesFilters from "@razomy/graphics-codecs-web-canvas-textures-filters";

export class BrightenTextureFilter implements graphicsCodecsWebCanvasTexturesFilters.ITextureFilter {
  /**
   * get/set filter brightness.  The brightness is a number between -1 and 1.&nbsp; Positive values
   *  brighten the pixels and negative values darken them. Use with {@link Konva.Filters.Brighten} filter.
   * @name Konva.Node#brightness
   * @method

   * @param {Number} brightness value between -1 and 1
   * @returns {Number}
   */
  constructor(public brightness: number = 0) {}

  public filter(imageData: any): void {
    let brightness = this.brightness * 255,
      data = imageData.data,
      len = data.length,
      i;

    for (i = 0; i < len; i += 4) {
      // red
      data[i] += brightness;
      // green
      data[i + 1] += brightness;
      // blue
      data[i + 2] += brightness;
    }
  }
}
