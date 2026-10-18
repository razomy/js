import * as abstractions from '@razomy/abstractions';

export function nextMarginIndex(
  string: string,
  equalString: string,
  offset: abstractions.array.Offset = 0,
  maxOffset: abstractions.array.Offset = string.length,
): abstractions.array.Index {
  let i = offset;
  for (; i < maxOffset; i++) {
    if (equalString == string[i]) {
    } else {
      return i;
    }
  }

  return i;
}
