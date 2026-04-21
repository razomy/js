import * as string from '@razomy/string';
import * as abstracts from '@razomy/abstracts';

export function nextMarginIndex(
  string: string.String,
  equalString: string.String,
  offset: abstracts.arrays.Offset = 0,
  maxOffset: abstracts.arrays.Offset = string.length,
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
