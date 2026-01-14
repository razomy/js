import { ITextureFilter }  from 'razomy.graphics/codecs/web/canvas/textures/filters/i_texture_filter';


export default function create_canvas_element(): HTMLCanvasElement {
  var canvas = document.createElement('canvas');
  // on some environments canvas.style is readonly
  try {
    (<any> canvas).style = canvas.style || {};
  } catch (e) {
    throw new Error('Canva tyle is rreadonly');
  }
  return canvas as HTMLCanvasElement;
}

/*
 * ToPolar Filter. Converts image data to polar coordinates. Performs
 *  w*h*4 pixel reads and w*h pixel writes. The r axis is placed along
 *  what would be the y axis and the theta axis along the x axis.
 * https://github.com/konvajs/konva
@function
 * @author ippo615
 * @memberof Konva.Filters
 * @param {ImageData} src, the source image data (what will be transformed)
 * @param {ImageData} dst, the destination image data (where it will be saved)
 * @param {Object} opt
 * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
 *  default is in the middle
 * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
 *  default is in the middle
 */


var to_polar = function(src: any, dst: any, opt: any) {
  var src_pixels = src.data,
    dst_pixels = dst.data,
    x_size = src.width,
    y_size = src.height,
    x_mid = opt.polarCenterX || x_size / 2,
    y_mid = opt.polarCenterY || y_size / 2,
    i,
    x,
    y,
    r = 0,
    g = 0,
    b = 0,
    a = 0;

  // Find the largest radius
  var rad,
    r_max = Math.sqrt(x_mid * x_mid + y_mid * y_mid);
  x = x_size - x_mid;
  y = y_size - y_mid;
  rad = Math.sqrt(x * x + y * y);
  r_max = rad > r_max ? rad : r_max;

  // We'll be uisng y as the radius, and x as the angle (theta=t)
  var r_size = y_size,
    t_size = x_size,
    radius,
    theta;

  // We want to cover all angles (0-360) and we need to convert to
  // radians (*PI/180)
  var conversion = ((360 / t_size) * Math.PI) / 180,
    sin,
    cos;

  // var x1, x2, x1i, x2i, y1, y2, y1i, y2i, scale;

  for (theta = 0; theta < t_size; theta += 1) {
    sin = Math.sin(theta * conversion);
    cos = Math.cos(theta * conversion);
    for (radius = 0; radius < r_size; radius += 1) {
      x = Math.floor(x_mid + ((r_max * radius) / r_size) * cos);
      y = Math.floor(y_mid + ((r_max * radius) / r_size) * sin);
      i = (y * x_size + x) * 4;
      r = src_pixels[i + 0];
      g = src_pixels[i + 1];
      b = src_pixels[i + 2];
      a = src_pixels[i + 3];

      // Store it
      //i = (theta * xSize  +  radius) * 4;
      i = (theta + radius * x_size) * 4;
      dst_pixels[i + 0] = r;
      dst_pixels[i + 1] = g;
      dst_pixels[i + 2] = b;
      dst_pixels[i + 3] = a;
    }
  }
};

/*
 * FromPolar Filter. Converts image data from polar coordinates back to rectangular.
 *  Performs w*h*4 pixel reads and w*h pixel writes.
 * https://github.com/konvajs/konva
@function
 * @author ippo615
 * @memberof Konva.Filters
 * @param {ImageData} src, the source image data (what will be transformed)
 * @param {ImageData} dst, the destination image data (where it will be saved)
 * @param {Object} opt
 * @param {Number} [opt.polarCenterX] horizontal location for the center of the circle,
 *  default is in the middle
 * @param {Number} [opt.polarCenterY] vertical location for the center of the circle,
 *  default is in the middle
 * @param {Number} [opt.polarRotation] amount to rotate the image counterclockwis,
 *  0 is no rotation, 360 degrees is a full rotation
 */

var from_polar = function(src: any, dst: any, opt: any) {
  var src_pixels = src.data,
    dst_pixels = dst.data,
    x_size = src.width,
    y_size = src.height,
    x_mid = opt.polarCenterX || x_size / 2,
    y_mid = opt.polarCenterY || y_size / 2,
    i,
    x,
    y,
    dx,
    dy,
    r = 0,
    g = 0,
    b = 0,
    a = 0;

  // Find the largest radius
  var rad,
    r_max = Math.sqrt(x_mid * x_mid + y_mid * y_mid);
  x = x_size - x_mid;
  y = y_size - y_mid;
  rad = Math.sqrt(x * x + y * y);
  r_max = rad > r_max ? rad : r_max;

  // We'll be uisng x as the radius, and y as the angle (theta=t)
  var r_size = y_size,
    t_size = x_size,
    radius,
    theta,
    phase_shift = opt.polarRotation || 0;

  // We need to convert to degrees and we need to make sure
  // it's between (0-360)
  // var conversion = tSize/360*180/Math.PI;
  //var conversion = tSize/360*180/Math.PI;

  var x1, y1;

  for (x = 0; x < x_size; x += 1) {
    for (y = 0; y < y_size; y += 1) {
      dx = x - x_mid;
      dy = y - y_mid;
      radius = (Math.sqrt(dx * dx + dy * dy) * r_size) / r_max;
      theta = ((Math.atan2(dy, dx) * 180) / Math.PI + 360 + phase_shift) % 360;
      theta = (theta * t_size) / 360;
      x1 = Math.floor(theta);
      y1 = Math.floor(radius);
      i = (y1 * x_size + x1) * 4;
      r = src_pixels[i + 0];
      g = src_pixels[i + 1];
      b = src_pixels[i + 2];
      a = src_pixels[i + 3];

      // Store it
      i = (y * x_size + x) * 4;
      dst_pixels[i + 0] = r;
      dst_pixels[i + 1] = g;
      dst_pixels[i + 2] = b;
      dst_pixels[i + 3] = a;
    }
  }
};

//Konva.Filters.ToPolar = Util._FilterWrapDoubleBuffer(ToPolar);
//Konva.Filters.FromPolar = Util._FilterWrapDoubleBuffer(FromPolar);

// create a temporary canvas for working - shared between multiple calls

/*
 * Kaleidoscope Filter.
 * https://github.com/konvajs/konva
@function
 * @name Kaleidoscope
 * @author ippo615
 * @memberof Konva.Filters
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Kaleidoscope]);
 * node.kaleidoscopePower(3);
 * node.kaleidoscopeAngle(45);
 */
export class KaleidoscopeTextureFilter implements ITextureFilter {

  constructor(
    /**
     * get/set kaleidoscope power. Use with {@link Konva.Filters.Kaleidoscope} filter.
     * @name Konva.Node#kaleidoscopePower
     * @method
     * @param {Integer} power of kaleidoscope
     * @returns {Integer}
     */
    public kaleidoscopePower = 2,
    /**
     * get/set kaleidoscope angle. Use with {@link Konva.Filters.Kaleidoscope} filter.
     * @name Konva.Node#kaleidoscopeAngle
     * @method
     * @param {Integer} degrees
     * @returns {Integer}
     */

    public kaleidoscopeAngle = 0
  ) {
  }

  public filter(imageData: any): void {
    var x_size = imageData.width,
      y_size = imageData.height;

    var x, y, xoff, i, r, g, b, a, src_pos, dst_pos;
    var power = Math.round(this.kaleidoscopePower);
    var angle = Math.round(this.kaleidoscopeAngle);
    var offset = Math.floor((x_size * (angle % 360)) / 360);

    if (power < 1) {
      return;
    }

    // Work with our shared buffer canvas
    var temp_canvas = create_canvas_element();
    temp_canvas.width = x_size;
    temp_canvas.height = y_size;
    var scratch_data = temp_canvas.getContext('2d')!.getImageData(0, 0, x_size, y_size);

    // Convert thhe original to polar coordinates
    to_polar(imageData, scratch_data, {
      polarCenterX: x_size / 2,
      polarCenterY: y_size / 2
    });

    // Determine how big each section will be, if it's too small
    // make it bigger
    var min_section_size = x_size / Math.pow(2, power);
    while (min_section_size <= 8) {
      min_section_size = min_section_size * 2;
      power -= 1;
    }
    min_section_size = Math.ceil(min_section_size);
    var section_size = min_section_size;

    // Copy the offset region to 0
    // Depending on the size of filter and location of the offset we may need
    // to copy the section backwards to prevent it from rewriting itself
    var x_start = 0,
      x_end = section_size,
      x_delta = 1;
    if (offset + min_section_size > x_size) {
      x_start = section_size;
      x_end = 0;
      x_delta = -1;
    }
    for (y = 0; y < y_size; y += 1) {
      for (x = x_start; x !== x_end; x += x_delta) {
        xoff = Math.round(x + offset) % x_size;
        src_pos = (x_size * y + xoff) * 4;
        r = scratch_data.data[src_pos + 0];
        g = scratch_data.data[src_pos + 1];
        b = scratch_data.data[src_pos + 2];
        a = scratch_data.data[src_pos + 3];
        dst_pos = (x_size * y + x) * 4;
        scratch_data.data[dst_pos + 0] = r;
        scratch_data.data[dst_pos + 1] = g;
        scratch_data.data[dst_pos + 2] = b;
        scratch_data.data[dst_pos + 3] = a;
      }
    }

    // Perform the actual effect
    for (y = 0; y < y_size; y += 1) {
      section_size = Math.floor(min_section_size);
      for (i = 0; i < power; i += 1) {
        for (x = 0; x < section_size + 1; x += 1) {
          src_pos = (x_size * y + x) * 4;
          r = scratch_data.data[src_pos + 0];
          g = scratch_data.data[src_pos + 1];
          b = scratch_data.data[src_pos + 2];
          a = scratch_data.data[src_pos + 3];
          dst_pos = (x_size * y + section_size * 2 - x - 1) * 4;
          scratch_data.data[dst_pos + 0] = r;
          scratch_data.data[dst_pos + 1] = g;
          scratch_data.data[dst_pos + 2] = b;
          scratch_data.data[dst_pos + 3] = a;
        }
        section_size *= 2;
      }
    }

    // Convert back from polar coordinates
    from_polar(scratch_data, imageData, { polarRotation: 0 });
  };
}

