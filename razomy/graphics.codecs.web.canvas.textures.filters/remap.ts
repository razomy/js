export function remap(fromValue: any, fromMin: any, fromMax: any, toMin: any, toMax: any) {
  // Compute the range of the data
  var fromRange = fromMax - fromMin,
    toRange = toMax - toMin,
    toValue;

  // If either range is 0, then the value can only be mapped to 1 value
  if (fromRange === 0) {
    return toMin + toRange / 2;
  }
  if (toRange === 0) {
    return toMin;
  }

  // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
  toValue = (fromValue - fromMin) / fromRange;
  toValue = toRange * toValue + toMin;

  return toValue;
}

