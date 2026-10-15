import * as abstractions from '@razomy/abstractions';

export function stringsAnyIndex(
  string: string,
  chars: Set<string>,
  offset: abstractions.arrays.Offset = 0,
  maxOffset: abstractions.arrays.Offset = string.length,
): abstractions.arrays.Index {
  for (let i = offset; i < maxOffset; i++) {
    if (chars.has(string[i])) {
      return i;
    }
  }

  return -1;
}
