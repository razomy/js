import * as abstractions from '@razomy/abstractions';

export function lastIndex(
  string: string,
  equalString: string,
  offset: abstractions.array.Offset = 0,
  maxOffset: abstractions.array.Offset = string.length,
): abstractions.array.Index {
  for (let i = maxOffset - 1; i >= offset; i--) {
    if (string[i] === equalString) {
      return i;
    }
  }
  return -1;
}
