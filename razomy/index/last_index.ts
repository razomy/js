import * as string from "@razomy/string";
import * as offset from "@razomy/offset";
import * as abstracts from "@razomy/abstracts";

export function lastIndex(
  string: string.String,
  equalString: string.String,
  offset: offset.Offset = 0,
  maxOffset: offset.Offset = string.length,
): abstracts.arrays.Index {
  for (let i = maxOffset - 1; i >= offset; i--) {
    if (string[i] === equalString) {
      return i;
    }
  }
  return -1;
}
