export function applyMask(idata: any, mask: any) {
  for (var i = 0; i < idata.width * idata.height; i++) {
    idata.data[4 * i + 3] = mask[i];
  }
}
