export function erodeMask(mask: any, sw: number, sh: number) {
  const weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const maskResult: any[] = [];
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const so = y * sw + x;
      let a = 0;
      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = scy * sw + scx;
            const wt = weights[cy * side + cx];

            a += mask[srcOff] * wt;
          }
        }
      }

      maskResult[so] = a === 255 * 8 ? 255 : 0;
    }
  }

  return maskResult;
}
