/*
 the Gauss filter
 https://github.com/konvajs/konva
 master repo: https://github.com/pavelpower/kineticjsGaussFilter
*/
/*

     StackBlur - a fast almost Gaussian Blur For Canvas

     Version:   0.5
     Author:    Mario Klingemann
     Contact:   mario@quasimondo.com
     Website:   http://www.quasimondo.com/StackBlurForCanvas
     Twitter:   @quasimondo

     In case you find this class useful - especially in commercial projects -
     I am not totally unhappy for a small donation to my PayPal account
     mario@quasimondo.de

     Or support me on flattr:
     https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

     Copyright (c) 2010 Mario Klingemann

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.
     */

import { ITextureFilter }  from 'razomy.graphics/codecs/web/canvas/textures/filters/i_texture_filter';

export class BlurStack {
  public r = 0;
  public g = 0;
  public b = 0;
  public a = 0;
  public next: any = null;
}

var mul_table = [
  512,
  512,
  456,
  512,
  328,
  456,
  335,
  512,
  405,
  328,
  271,
  456,
  388,
  335,
  292,
  512,
  454,
  405,
  364,
  328,
  298,
  271,
  496,
  456,
  420,
  388,
  360,
  335,
  312,
  292,
  273,
  512,
  482,
  454,
  428,
  405,
  383,
  364,
  345,
  328,
  312,
  298,
  284,
  271,
  259,
  496,
  475,
  456,
  437,
  420,
  404,
  388,
  374,
  360,
  347,
  335,
  323,
  312,
  302,
  292,
  282,
  273,
  265,
  512,
  497,
  482,
  468,
  454,
  441,
  428,
  417,
  405,
  394,
  383,
  373,
  364,
  354,
  345,
  337,
  328,
  320,
  312,
  305,
  298,
  291,
  284,
  278,
  271,
  265,
  259,
  507,
  496,
  485,
  475,
  465,
  456,
  446,
  437,
  428,
  420,
  412,
  404,
  396,
  388,
  381,
  374,
  367,
  360,
  354,
  347,
  341,
  335,
  329,
  323,
  318,
  312,
  307,
  302,
  297,
  292,
  287,
  282,
  278,
  273,
  269,
  265,
  261,
  512,
  505,
  497,
  489,
  482,
  475,
  468,
  461,
  454,
  447,
  441,
  435,
  428,
  422,
  417,
  411,
  405,
  399,
  394,
  389,
  383,
  378,
  373,
  368,
  364,
  359,
  354,
  350,
  345,
  341,
  337,
  332,
  328,
  324,
  320,
  316,
  312,
  309,
  305,
  301,
  298,
  294,
  291,
  287,
  284,
  281,
  278,
  274,
  271,
  268,
  265,
  262,
  259,
  257,
  507,
  501,
  496,
  491,
  485,
  480,
  475,
  470,
  465,
  460,
  456,
  451,
  446,
  442,
  437,
  433,
  428,
  424,
  420,
  416,
  412,
  408,
  404,
  400,
  396,
  392,
  388,
  385,
  381,
  377,
  374,
  370,
  367,
  363,
  360,
  357,
  354,
  350,
  347,
  344,
  341,
  338,
  335,
  332,
  329,
  326,
  323,
  320,
  318,
  315,
  312,
  310,
  307,
  304,
  302,
  299,
  297,
  294,
  292,
  289,
  287,
  285,
  282,
  280,
  278,
  275,
  273,
  271,
  269,
  267,
  265,
  263,
  261,
  259
];

var shg_table = [
  9,
  11,
  12,
  13,
  13,
  14,
  14,
  15,
  15,
  15,
  15,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  21,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  22,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24,
  24
];

export function filter_gauss_blur_rgba(imageData: any, radius: any) {
  var pixels = imageData.data,
    width = imageData.width,
    height = imageData.height;

  var x,
    y,
    i,
    p,
    yp,
    yi,
    yw,
    r_sum,
    g_sum,
    b_sum,
    a_sum,
    r_out_sum,
    g_out_sum,
    b_out_sum,
    a_out_sum,
    r_in_sum,
    g_in_sum,
    b_in_sum,
    a_in_sum,
    pr,
    pg,
    pb,
    pa,
    rbs;

  var div = radius + radius + 1,
    width_minus1 = width - 1,
    height_minus1 = height - 1,
    radius_plus1 = radius + 1,
    sum_factor = (radius_plus1 * (radius_plus1 + 1)) / 2,
    stack_start = new BlurStack(),
    stack_end: BlurStack = null!,
    stack = stack_start,
    stack_in: BlurStack = null!,
    stack_out: BlurStack = null!,
    mul_sum = mul_table[radius],
    shg_sum = shg_table[radius];

  for (i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i === radius_plus1) {
      stack_end = stack;
    }
  }

  stack.next = stack_start;

  yw = yi = 0;

  for (y = 0; y < height; y++) {
    r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

    r_out_sum = radius_plus1 * (pr = pixels[yi]);
    g_out_sum = radius_plus1 * (pg = pixels[yi + 1]);
    b_out_sum = radius_plus1 * (pb = pixels[yi + 2]);
    a_out_sum = radius_plus1 * (pa = pixels[yi + 3]);

    r_sum += sum_factor * pr;
    g_sum += sum_factor * pg;
    b_sum += sum_factor * pb;
    a_sum += sum_factor * pa;

    stack = stack_start;

    for (i = 0; i < radius_plus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    for (i = 1; i < radius_plus1; i++) {
      p = yi + ((width_minus1 < i ? width_minus1 : i) << 2);
      r_sum += (stack.r = pr = pixels[p]) * (rbs = radius_plus1 - i);
      g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
      a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;

      stack = stack.next;
    }

    stack_in = stack_start;
    stack_out = stack_end;
    for (x = 0; x < width; x++) {
      pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
      if (pa !== 0) {
        pa = 255 / pa;
        pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
        pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
        pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;

      r_out_sum -= stack_in.r;
      g_out_sum -= stack_in.g;
      b_out_sum -= stack_in.b;
      a_out_sum -= stack_in.a;

      p = (yw + ((p = x + radius + 1) < width_minus1 ? p : width_minus1)) << 2;

      r_in_sum += stack_in.r = pixels[p];
      g_in_sum += stack_in.g = pixels[p + 1];
      b_in_sum += stack_in.b = pixels[p + 2];
      a_in_sum += stack_in.a = pixels[p + 3];

      r_sum += r_in_sum;
      g_sum += g_in_sum;
      b_sum += b_in_sum;
      a_sum += a_in_sum;

      stack_in = stack_in.next;

      r_out_sum += pr = stack_out.r;
      g_out_sum += pg = stack_out.g;
      b_out_sum += pb = stack_out.b;
      a_out_sum += pa = stack_out.a;

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;

      stack_out = stack_out!.next;

      yi += 4;
    }
    yw += width;
  }

  for (x = 0; x < width; x++) {
    g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

    yi = x << 2;
    r_out_sum = radius_plus1 * (pr = pixels[yi]);
    g_out_sum = radius_plus1 * (pg = pixels[yi + 1]);
    b_out_sum = radius_plus1 * (pb = pixels[yi + 2]);
    a_out_sum = radius_plus1 * (pa = pixels[yi + 3]);

    r_sum += sum_factor * pr;
    g_sum += sum_factor * pg;
    b_sum += sum_factor * pb;
    a_sum += sum_factor * pa;

    stack = stack_start;

    for (i = 0; i < radius_plus1; i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }

    yp = width;

    for (i = 1; i <= radius; i++) {
      yi = (yp + x) << 2;

      r_sum += (stack.r = pr = pixels[yi]) * (rbs = radius_plus1 - i);
      g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
      b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
      a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

      r_in_sum += pr;
      g_in_sum += pg;
      b_in_sum += pb;
      a_in_sum += pa;

      stack = stack.next;

      if (i < height_minus1) {
        yp += width;
      }
    }

    yi = x;
    stack_in = stack_start;
    stack_out = stack_end;
    for (y = 0; y < height; y++) {
      p = yi << 2;
      pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
      if (pa > 0) {
        pa = 255 / pa;
        pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
        pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
        pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
      } else {
        pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
      }

      r_sum -= r_out_sum;
      g_sum -= g_out_sum;
      b_sum -= b_out_sum;
      a_sum -= a_out_sum;

      r_out_sum -= stack_in.r;
      g_out_sum -= stack_in.g;
      b_out_sum -= stack_in.b;
      a_out_sum -= stack_in.a;

      p =
        (x +
          ((p = y + radius_plus1) < height_minus1 ? p : height_minus1) * width) <<
        2;

      r_sum += r_in_sum += stack_in.r = pixels[p];
      g_sum += g_in_sum += stack_in.g = pixels[p + 1];
      b_sum += b_in_sum += stack_in.b = pixels[p + 2];
      a_sum += a_in_sum += stack_in.a = pixels[p + 3];

      stack_in = stack_in.next;

      r_out_sum += pr = stack_out.r;
      g_out_sum += pg = stack_out.g;
      b_out_sum += pb = stack_out.b;
      a_out_sum += pa = stack_out.a;

      r_in_sum -= pr;
      g_in_sum -= pg;
      b_in_sum -= pb;
      a_in_sum -= pa;

      stack_out = stack_out!.next;

      yi += width;
    }
  }
}

/**
 * Blur Filter
 * https://github.com/konvajs/konva
 @function
 * @name Blur
 * @memberof Konva.Filters
 * @param {Object} imageData
 * @example
 * node.cache();
 * node.Filters([Konva.Filters.Blur]);
 * node.blurRadius(10);
 */
export class BlurTextureFilter implements ITextureFilter {
  /**
   * get/set blur radius. Use with {@link Konva.Filters.Blur} filter
   * @name Konva.Node#blurRadius
   * @method
   * @param {Integer} radius
   * @returns {Integer}
   */
  constructor(public blurRadius: number = 0) {
  }

  public filter(imageData: any): void {
    var radius = Math.round(this.blurRadius);

    if (radius > 0) {
      filter_gauss_blur_rgba(imageData, radius);
    }
  };
}
