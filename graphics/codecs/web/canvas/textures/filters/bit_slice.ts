export function bit_slice(val: number) {
  if (val > 1) {
    return 1;
  } else if (val < 0.0001) {
    // chrome does not honor alpha values of 0
    return 0.0001;
  } else {
    return val;
  }
}

