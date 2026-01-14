
export default function dilate_mask(mask: any, sw: any, sh: any) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var half_side = Math.floor(side / 2);
    var mask_result: any[] = [];
    for (var y = 0; y < sh; y++) {
    for (var x = 0; x < sw; x++) {
      var so = y * sw + x;
      var a = 0;
      for (var cy = 0; cy < side; cy++) {
        for (var cx = 0; cx < side; cx++) {
          var scy = y + cy - half_side;
          var scx = x + cx - half_side;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var src_off = scy * sw + scx;
            var wt = weights[cy * side + cx];

            a += mask[src_off] * wt;
          }
        }
      }

      mask_result[so] = a >= 255 * 4 ? 255 : 0;
    }
    }

    return mask_result;
}
