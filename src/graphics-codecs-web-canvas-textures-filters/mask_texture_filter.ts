import * as graphicsCodecsWebCanvasTexturesFilters from '@razomy/graphics-codecs-web-canvas-textures-filters';

/**
 * Mask Filter
 * https://github.com/konvajs/konva
 @function
 * @name Mask
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Mask]);
 * node.threshold(200);
 */
export class MaskTextureFilter implements graphicsCodecsWebCanvasTexturesFilters.ITextureFilter {
  constructor(public threshold = 0) {}

  public filter(imageData: any): void {
    // Detect pixels close to the background color
    let threshold = this.threshold,
      mask = graphicsCodecsWebCanvasTexturesFilters.backgroundMask(imageData, threshold);
    if (mask) {
      // Erode
      mask = graphicsCodecsWebCanvasTexturesFilters.erodeMask(mask, imageData.width, imageData.height);

      // Dilate
      mask = graphicsCodecsWebCanvasTexturesFilters.dilateMask(mask, imageData.width, imageData.height);

      // Gradient
      mask = graphicsCodecsWebCanvasTexturesFilters.smoothEdgeMask(mask, imageData.width, imageData.height);

      // Apply mask
      graphicsCodecsWebCanvasTexturesFilters.applyMask(imageData, mask);
    }

    return imageData;
  }
}
