import { ITextureFilter }  from 'razomy/graphics/codecs/web/canvas/textures/filters/i_texture_filter';

function pixelAt(idata: any, x: number, y: number) {
  var idx = (y * idata.width + x) * 4;
  var d: any[] = [];
  d.push(
    idata.data[idx++],
    idata.data[idx++],
    idata.data[idx++],
    idata.data[idx++],
  );
  return d;
}

function rgbDistance(p1: number[], p2: number[]) {
  return Math.sqrt(
    Math.pow(p1[0] - p2[0], 2) +
    Math.pow(p1[1] - p2[1], 2) +
    Math.pow(p1[2] - p2[2], 2),
  );
}

function rgbMean(pTab: any) {
  var m = [0, 0, 0];

  for (var i = 0; i < pTab.length; i++) {
    m[0] += pTab[i][0];
    m[1] += pTab[i][1];
    m[2] += pTab[i][2];
  }

  m[0] /= pTab.length;
  m[1] /= pTab.length;
  m[2] /= pTab.length;

  return m;
}

function backgroundMask(idata: any, threshold: number): any {
  var rgbv_no = pixelAt(idata, 0, 0);
  var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
  var rgbv_so = pixelAt(idata, 0, idata.height - 1);
  var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);

  var thres = threshold || 10;
  if (
    rgbDistance(rgbv_no, rgbv_ne) < thres &&
    rgbDistance(rgbv_ne, rgbv_se) < thres &&
    rgbDistance(rgbv_se, rgbv_so) < thres &&
    rgbDistance(rgbv_so, rgbv_no) < thres
  ) {
    // Mean color
    var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

    // Mask based on color distance
    var mask: any[] = [];
    for (var i = 0; i < idata.width * idata.height; i++) {
      var d = rgbDistance(mean, [
        idata.data[i * 4],
        idata.data[i * 4 + 1],
        idata.data[i * 4 + 2],
      ]);
      mask[i] = d < thres ? 0 : 255;
    }

    return mask;
  }
}

function applyMask(idata: any, mask: any) {
  for (var i = 0; i < idata.width * idata.height; i++) {
    idata.data[4 * i + 3] = mask[i];
  }
}

function erodeMask(mask: any, sw: number, sh: number) {
  var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side / 2);

  var maskResult: any[] = [];
  for (var y = 0; y < sh; y++) {
    for (var x = 0; x < sw; x++) {
      var so = y * sw + x;
      var a = 0;
      for (var cy = 0; cy < side; cy++) {
        for (var cx = 0; cx < side; cx++) {
          var scy = y + cy - halfSide;
          var scx = x + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = scy * sw + scx;
            var wt = weights[cy * side + cx];

            a += mask[srcOff] * wt;
          }
        }
      }

      maskResult[so] = a === 255 * 8 ? 255 : 0;
    }
  }

  return maskResult;
}

function dilateMask(mask: any, sw: any, sh: any) {
  var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side / 2);

  var maskResult: any[] = [];
  for (var y = 0; y < sh; y++) {
    for (var x = 0; x < sw; x++) {
      var so = y * sw + x;
      var a = 0;
      for (var cy = 0; cy < side; cy++) {
        for (var cx = 0; cx < side; cx++) {
          var scy = y + cy - halfSide;
          var scx = x + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = scy * sw + scx;
            var wt = weights[cy * side + cx];

            a += mask[srcOff] * wt;
          }
        }
      }

      maskResult[so] = a >= 255 * 4 ? 255 : 0;
    }
  }

  return maskResult;
}

function smoothEdgeMask(mask: any, sw: any, sh: any) {
  var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side / 2);

  var maskResult: any[] = [];
  for (var y = 0; y < sh; y++) {
    for (var x = 0; x < sw; x++) {
      var so = y * sw + x;
      var a = 0;
      for (var cy = 0; cy < side; cy++) {
        for (var cx = 0; cx < side; cx++) {
          var scy = y + cy - halfSide;
          var scx = x + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = scy * sw + scx;
            var wt = weights[cy * side + cx];

            a += mask[srcOff] * wt;
          }
        }
      }

      maskResult[so] = a;
    }
  }

  return maskResult;
}

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

