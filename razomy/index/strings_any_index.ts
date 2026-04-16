import * as string from '@razomy/string';
import * as abstracts from '@razomy/abstracts';

export function stringsAnyIndex(
  string: string.String,
  chars: Set<string>,
  offset: abstracts.arrays.Offset = 0,
  maxOffset: abstracts.arrays.Offset = string.length,
): abstracts.arrays.Index {
  for (let i = offset; i < maxOffset; i++) {
    if (chars.has(string[i])) {
      return i;
    }
  }

  return -1;
}
