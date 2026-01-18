export function byteSlice(val: number): number {
  if (val > 255) {
    return 255;
  } else if (val < 0) {
    return 0;
  } else {
    return Math.round(val);
  }
}

