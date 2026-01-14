import {pixel_at, rgb_distance, rgb_mean} from './mask_texture_filter';

export function background_mask(idata: any, threshold: number): any {
    var rgbv_no = pixel_at(idata, 0, 0);
    var rgbv_ne = pixel_at(idata, idata.width - 1, 0);
    var rgbv_so = pixel_at(idata, 0, idata.height - 1);
    var rgbv_se = pixel_at(idata, idata.width - 1, idata.height - 1);
    var thres = threshold || 10;
    if (
    rgb_distance(rgbv_no, rgbv_ne) < thres &&
    rgb_distance(rgbv_ne, rgbv_se) < thres &&
    rgb_distance(rgbv_se, rgbv_so) < thres &&
    rgb_distance(rgbv_so, rgbv_no) < thres
    ) {
    // Mean color
    var mean = rgb_mean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);

    // Mask based on color distance
    var mask: any[] = [];
    for (var i = 0; i < idata.width * idata.height; i++) {
      var d = rgb_distance(mean, [
        idata.data[i * 4],
        idata.data[i * 4 + 1],
        idata.data[i * 4 + 2],
      ]);
      mask[i] = d < thres ? 0 : 255;
    }

    return mask;
    }
}
