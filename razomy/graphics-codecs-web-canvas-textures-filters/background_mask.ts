import { pixelAt } from './pixel_at';
import { rgbDistance } from './rgb_distance';
import { rgbMean } from './rgb_mean';

export function backgroundMask(idata: any, threshold: number): any {
  const rgbvNo = pixelAt(idata, 0, 0);
  const rgbvNe = pixelAt(idata, idata.width - 1, 0);
  const rgbvSo = pixelAt(idata, 0, idata.height - 1);
  const rgbvSe = pixelAt(idata, idata.width - 1, idata.height - 1);
  const thres = threshold || 10;
  if (
    rgbDistance(rgbvNo, rgbvNe) < thres &&
    rgbDistance(rgbvNe, rgbvSe) < thres &&
    rgbDistance(rgbvSe, rgbvSo) < thres &&
    rgbDistance(rgbvSo, rgbvNo) < thres
  ) {
    // Mean color
    const mean = rgbMean([rgbvNe, rgbvNo, rgbvSe, rgbvSo]);

    // Mask based on color distance
    const mask: any[] = [];
    for (let i = 0; i < idata.width * idata.height; i++) {
      const d = rgbDistance(mean, [idata.data[i * 4], idata.data[i * 4 + 1], idata.data[i * 4 + 2]]);
      mask[i] = d < thres ? 0 : 255;
    }

    return mask;
  }
}
