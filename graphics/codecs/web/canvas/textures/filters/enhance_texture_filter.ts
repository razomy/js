import { ITextureFilter }  from 'razomy.graphics/codecs/web/canvas/textures/filters/i_texture_filter';

export function remap(from_value: any, from_min: any, from_max: any, to_min: any, to_max: any) {
  // Compute the range of the data
  var from_range = from_max - from_min,
    to_range = to_max - to_min,
    to_value;

  // If either range is 0, then the value can only be mapped to 1 value
  if (from_range === 0) {
    return to_min + to_range / 2;
  }
  if (to_range === 0) {
    return to_min;
  }

  // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
  to_value = (from_value - from_min) / from_range;
  to_value = to_range * to_value + to_min;

  return to_value;
}

/**
 * Enhance Filter. Adjusts the colors so that they span the widest
 *  possible range (ie 0-255). Performs w*h pixel reads and w*h pixel
 *  writes.
 * https://github.com/konvajs/konva
 @function
 * @name Enhance
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @author ippo615
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Enhance]);
 * node.enhance(0.4);
 */
export class EnhanceTextureFilter implements ITextureFilter {
  constructor(
    /**
     * get/set enhance. Use with {@link Konva.Filters.Enhance} filter. -1 to 1 values
     * @name Konva.Node#enhance
     * @method
     * @param {Float} amount
     * @returns {Float}
     */
    public enhance = 0
  ) {
  }

  public filter(imageData: any): void {
    var data = imageData.data,
      n_sub_pixels = data.length,
      r_min = data[0],
      r_max = r_min,
      r,
      g_min = data[1],
      g_max = g_min,
      g,
      b_min = data[2],
      b_max = b_min,
      b,
      i;

    // If we are not enhancing anything - don't do any computation
    var enhance_amount = this.enhance;
    if (enhance_amount === 0) {
      return;
    }

    // 1st Pass - find the min and max for each channel:
    for (i = 0; i < n_sub_pixels; i += 4) {
      r = data[i + 0];
      if (r < r_min) {
        r_min = r;
      } else if (r > r_max) {
        r_max = r;
      }
      g = data[i + 1];
      if (g < g_min) {
        g_min = g;
      } else if (g > g_max) {
        g_max = g;
      }
      b = data[i + 2];
      if (b < b_min) {
        b_min = b;
      } else if (b > b_max) {
        b_max = b;
      }
      //a = data[i + 3];
      //if (a < aMin) { aMin = a; } else
      //if (a > aMax) { aMax = a; }
    }

    // If there is only 1 level - don't remap
    if (r_max === r_min) {
      r_max = 255;
      r_min = 0;
    }
    if (g_max === g_min) {
      g_max = 255;
      g_min = 0;
    }
    if (b_max === b_min) {
      b_max = 255;
      b_min = 0;
    }

    var r_mid,
      r_goal_max,
      r_goal_min,
      g_mid,
      g_goal_max,
      g_goal_min,
      b_mid,
      b_goal_max,
      b_goal_min;

    // If the enhancement is positive - stretch the histogram
    if (enhance_amount > 0) {
      r_goal_max = r_max + enhance_amount * (255 - r_max);
      r_goal_min = r_min - enhance_amount * (r_min - 0);
      g_goal_max = g_max + enhance_amount * (255 - g_max);
      g_goal_min = g_min - enhance_amount * (g_min - 0);
      b_goal_max = b_max + enhance_amount * (255 - b_max);
      b_goal_min = b_min - enhance_amount * (b_min - 0);
      // If the enhancement is negative -   compress the histogram
    } else {
      r_mid = (r_max + r_min) * 0.5;
      r_goal_max = r_max + enhance_amount * (r_max - r_mid);
      r_goal_min = r_min + enhance_amount * (r_min - r_mid);
      g_mid = (g_max + g_min) * 0.5;
      g_goal_max = g_max + enhance_amount * (g_max - g_mid);
      g_goal_min = g_min + enhance_amount * (g_min - g_mid);
      b_mid = (b_max + b_min) * 0.5;
      b_goal_max = b_max + enhance_amount * (b_max - b_mid);
      b_goal_min = b_min + enhance_amount * (b_min - b_mid);
    }

    // Pass 2 - remap everything, except the alpha
    for (i = 0; i < n_sub_pixels; i += 4) {
      data[i + 0] = remap(data[i + 0], r_min, r_max, r_goal_min, r_goal_max);
      data[i + 1] = remap(data[i + 1], g_min, g_max, g_goal_min, g_goal_max);
      data[i + 2] = remap(data[i + 2], b_min, b_max, b_goal_min, b_goal_max);
      //data[i + 3] = remap(data[i + 3], aMin, aMax, aGoalMin, aGoalMax);
    }
  };
}
