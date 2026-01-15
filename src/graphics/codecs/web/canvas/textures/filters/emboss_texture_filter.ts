import { ITextureFilter }  from 'razomy.graphics/codecs/web/canvas/textures/filters/i_texture_filter';

/**
 * Emboss Filter.
 * Pixastic Lib - Emboss filter - v0.1.0
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 * https://github.com/konvajs/konva
 @function
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Emboss]);
 * node.embossStrength(0.8);
 * node.embossWhiteLevel(0.3);
 * node.embossDirection('right');
 * node.embossBlend(true);
 */
export class EmbossTextureFilter implements ITextureFilter {

  constructor(
    /**
     * get/set emboss strength. Use with {@link Konva.Filters.Emboss} filter.
     * @name Konva.Node#embossStrength
     * @method
     * @param {Number} level between 0 and 1.  Default is 0.5
     * @returns {Number}
     */
    public embossStrength = 0.5,
    /**
     * get/set emboss white level. Use with {@link Konva.Filters.Emboss} filter.
     * @name Konva.Node#embossWhiteLevel
     * @method
     * @param {Number} embossWhiteLevel between 0 and 1.  Default is 0.5
     * @returns {Number}
     */
    public embossWhiteLevel = 0.5,
    /**
     * get/set emboss direction. Use with {@link Konva.Filters.Emboss} filter.
     * @name Konva.Node#embossDirection
     * @method
     * @param {String} embossDirection can be top-left, top, top-right, right, bottom-right, bottom, bottom-left or left
     *   The default is top-left
     * @returns {String}
     */

    public embossDirection = 'top-left',
    /**
     * get/set emboss blend. Use with {@link Konva.Filters.Emboss} filter.
     * @name Konva.Node#embossBlend
     * @method
     * @param {Boolean} embossBlend
     * @returns {Boolean}
     */
    public embossBlend = false
  ) {
  }

  public filter(imageData: any): void {
    // pixastic strength is between 0 and 10.  I want it between 0 and 1
    // pixastic greyLevel is between 0 and 255.  I want it between 0 and 1.  Also,
    // a max value of greyLevel yields a white emboss, and the min value yields a black
    // emboss.  Therefore, I changed greyLevel to whiteLevel
    var strength = this.embossStrength * 10,
      grey_level = this.embossWhiteLevel * 255,
      direction = this.embossDirection,
      blend = this.embossBlend,
      dir_y = 0,
      dir_x = 0,
      data = imageData.data,
      w = imageData.width,
      h = imageData.height,
      w_4 = w * 4,
      y = h;

    switch (direction) {
      case 'top-left':
        dir_y = -1;
        dir_x = -1;
        break;
      case 'top':
        dir_y = -1;
        dir_x = 0;
        break;
      case 'top-right':
        dir_y = -1;
        dir_x = 1;
        break;
      case 'right':
        dir_y = 0;
        dir_x = 1;
        break;
      case 'bottom-right':
        dir_y = 1;
        dir_x = 1;
        break;
      case 'bottom':
        dir_y = 1;
        dir_x = 0;
        break;
      case 'bottom-left':
        dir_y = 1;
        dir_x = -1;
        break;
      case 'left':
        dir_y = 0;
        dir_x = -1;
        break;
      default:
        throw new Error('Unknown emboss direction: ' + direction);
    }

    do {
      var offset_y = (y - 1) * w_4;

      var other_y = dir_y;
      if (y + other_y < 1) {
        other_y = 0;
      }
      if (y + other_y > h) {
        other_y = 0;
      }

      var offset_yother = (y - 1 + other_y) * w * 4;

      var x = w;
      do {
        var offset = offset_y + (x - 1) * 4;

        var other_x = dir_x;
        if (x + other_x < 1) {
          other_x = 0;
        }
        if (x + other_x > w) {
          other_x = 0;
        }

        var offset_other = offset_yother + (x - 1 + other_x) * 4;

        var d_r = data[offset] - data[offset_other];
        var d_g = data[offset + 1] - data[offset_other + 1];
        var d_b = data[offset + 2] - data[offset_other + 2];

        var dif = d_r;
        var abs_dif = dif > 0 ? dif : -dif;

        var abs_g = d_g > 0 ? d_g : -d_g;
        var abs_b = d_b > 0 ? d_b : -d_b;

        if (abs_g > abs_dif) {
          dif = d_g;
        }
        if (abs_b > abs_dif) {
          dif = d_b;
        }

        dif *= strength;

        if (blend) {
          var r = data[offset] + dif;
          var g = data[offset + 1] + dif;
          var b = data[offset + 2] + dif;

          data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
          data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
          data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
        } else {
          var grey = grey_level - dif;
          if (grey < 0) {
            grey = 0;
          } else if (grey > 255) {
            grey = 255;
          }

          data[offset] = data[offset + 1] = data[offset + 2] = grey;
        }
      } while (--x);
    } while (--y);
  };
}
