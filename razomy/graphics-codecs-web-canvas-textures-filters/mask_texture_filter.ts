import type {ITextureFilter} from './i_texture_filter';
import {backgroundMask} from './background_mask';
import {erodeMask} from './erode_mask';
import {dilateMask} from './dilate_mask';
import {smoothEdgeMask} from './smooth_edge_mask';
import {applyMask} from './apply_mask';

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
export class MaskTextureFilter implements ITextureFilter {
  constructor(
    public threshold = 0,
  ) {
  }

  public filter(imageData: any): void {
    // Detect pixels close to the background color
    var threshold = this.threshold,
      mask = backgroundMask(imageData, threshold);
    if (mask) {
      // Erode
      mask = erodeMask(mask, imageData.width, imageData.height);

      // Dilate
      mask = dilateMask(mask, imageData.width, imageData.height);

      // Gradient
      mask = smoothEdgeMask(mask, imageData.width, imageData.height);

      // Apply mask
      applyMask(imageData, mask);
    }

    return imageData;
  };
}