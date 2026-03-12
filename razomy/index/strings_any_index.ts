import * as string from '@razomy/string';
import * as offset from '@razomy/offset';
import * as abstracts from '@razomy/abstracts';

export function stringsAnyIndex(
  string: string.String,
  chars: Set<string>,
  offset: offset.Offset = 0,
  maxOffset: offset.Offset = string.length,
): abstracts.arrays.Index {
  for (let i = offset; i < maxOffset; i++) {
    if (chars.has(string[i])) {
      return i;
    }
  }

  return -1;
}
