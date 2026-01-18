import {pixelAt} from './pixel_at';
import {rgbDistance} from './rgb_distance';
import {rgbMean} from './rgb_mean';

export function backgroundMask(idata: any, threshold: number): any {
  var rgbvNo = pixelAt(idata, 0, 0);
  var rgbvNe = pixelAt(idata, idata.width - 1, 0);
  var rgbvSo = pixelAt(idata, 0, idata.height - 1);
  var rgbvSe = pixelAt(idata, idata.width - 1, idata.height - 1);
  var thres = threshold || 10;
  if (
    rgbDistance(rgbvNo, rgbvNe) < thres &&
    rgbDistance(rgbvNe, rgbvSe) < thres &&
    rgbDistance(rgbvSe, rgbvSo) < thres &&
    rgbDistance(rgbvSo, rgbvNo) < thres
  ) {
    // Mean color
    var mean = rgbMean([rgbvNe, rgbvNo, rgbvSe, rgbvSo]);

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
