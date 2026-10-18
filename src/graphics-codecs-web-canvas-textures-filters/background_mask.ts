import * as graphicsCodecsWebCanvasTexturesFilters from '@razomy/graphics-codecs-web-canvas-textures-filters';

export function backgroundMask(idata: any, threshold: number): any {
  const rgbvNo = graphicsCodecsWebCanvasTexturesFilters.pixelAt(idata, 0, 0);
  const rgbvNe = graphicsCodecsWebCanvasTexturesFilters.pixelAt(idata, idata.width - 1, 0);
  const rgbvSo = graphicsCodecsWebCanvasTexturesFilters.pixelAt(idata, 0, idata.height - 1);
  const rgbvSe = graphicsCodecsWebCanvasTexturesFilters.pixelAt(idata, idata.width - 1, idata.height - 1);
  const thres = threshold || 10;
  if (
    graphicsCodecsWebCanvasTexturesFilters.rgbDistance(rgbvNo, rgbvNe) < thres &&
    graphicsCodecsWebCanvasTexturesFilters.rgbDistance(rgbvNe, rgbvSe) < thres &&
    graphicsCodecsWebCanvasTexturesFilters.rgbDistance(rgbvSe, rgbvSo) < thres &&
    graphicsCodecsWebCanvasTexturesFilters.rgbDistance(rgbvSo, rgbvNo) < thres
  ) {
    // Mean color
    const mean = graphicsCodecsWebCanvasTexturesFilters.rgbMean([rgbvNe, rgbvNo, rgbvSe, rgbvSo]);

    // Mask based on color distance
    const mask: any[] = [];
    for (let i = 0; i < idata.width * idata.height; i++) {
      const d = graphicsCodecsWebCanvasTexturesFilters.rgbDistance(mean, [
        idata.data[i * 4],
        idata.data[i * 4 + 1],
        idata.data[i * 4 + 2],
      ]);
      mask[i] = d < thres ? 0 : 255;
    }

    return mask;
  }
}
