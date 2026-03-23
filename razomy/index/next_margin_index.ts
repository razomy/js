import * as string from '@razomy/string';
import * as offset from '../abstracts/arrays/offest';
import * as abstracts from '@razomy/abstracts';

export function nextMarginIndex(
  string: string.String,
  equalString: string.String,
  offset: offset.Offset = 0,
  maxOffset: offset.Offset = string.length,
): abstracts.arrays.Index {
  let i = offset;
  for (; i < maxOffset; i++) {
    if (equalString == string[i]) {
    } else {
      return i;
    }
  }

  return i;
}
