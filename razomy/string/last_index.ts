import * as abstractions from '@razomy/abstractions';

export function lastIndex(
  string: string,
  equalString: string,
  offset: abstractions.arrays.Offset = 0,
  maxOffset: abstractions.arrays.Offset = string.length,
): abstractions.arrays.Index {
  for (let i = maxOffset - 1; i >= offset; i--) {
    if (string[i] === equalString) {
      return i;
    }
  }
  return -1;
}
