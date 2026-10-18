import * as abstractions from '@razomy/abstractions';

export function stringsAnyIndex(
  string: string,
  chars: Set<string>,
  offset: abstractions.array.Offset = 0,
  maxOffset: abstractions.array.Offset = string.length,
): abstractions.array.Index {
  for (let i = offset; i < maxOffset; i++) {
    if (chars.has(string[i])) {
      return i;
    }
  }

  return -1;
}
