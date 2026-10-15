import * as abstractions from '@razomy/abstractions';

export function nextMarginIndex(
  string: string,
  equalString: string,
  offset: abstractions.arrays.Offset = 0,
  maxOffset: abstractions.arrays.Offset = string.length,
): abstractions.arrays.Index {
  let i = offset;
  for (; i < maxOffset; i++) {
    if (equalString == string[i]) {
    } else {
      return i;
    }
  }

  return i;
}
