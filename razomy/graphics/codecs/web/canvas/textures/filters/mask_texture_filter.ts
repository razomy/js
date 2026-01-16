import {ITextureFilter} from './i_texture_filter';
import {background_mask} from './background_mask';
import {erode_mask} from './erode_mask';
import {dilate_mask} from './dilate_mask';
import {smooth_edge_mask} from './smooth_edge_mask';
import {apply_mask} from './apply_mask';

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
      mask = background_mask(imageData, threshold);
    if (mask) {
      // Erode
      mask = erode_mask(mask, imageData.width, imageData.height);

      // Dilate
      mask = dilate_mask(mask, imageData.width, imageData.height);

      // Gradient
      mask = smooth_edge_mask(mask, imageData.width, imageData.height);

      // Apply mask
      apply_mask(imageData, mask);
    }

    return imageData;
  };
}