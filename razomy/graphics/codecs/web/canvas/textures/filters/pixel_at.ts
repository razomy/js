export function pixel_at(idata: any, x: number, y: number) {
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

