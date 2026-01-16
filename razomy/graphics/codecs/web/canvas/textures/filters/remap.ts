export function remap(from_value: any, from_min: any, from_max: any, to_min: any, to_max: any) {
  // Compute the range of the data
  var from_range = from_max - from_min,
    to_range = to_max - to_min,
    to_value;

  // If either range is 0, then the value can only be mapped to 1 value
  if (from_range === 0) {
    return to_min + to_range / 2;
  }
  if (to_range === 0) {
    return to_min;
  }

  // (1) untranslate, (2) unscale, (3) rescale, (4) retranslate
  to_value = (from_value - from_min) / from_range;
  to_value = to_range * to_value + to_min;

  return to_value;
}

