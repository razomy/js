import * as string from '@razomy/string';
import * as index from '@razomy/index';
import * as abstracts from "@razomy/abstracts";

export function isStringsAnyIndex(
  string: string.String,
  equalStrings: Set<string>,
  offset: abstracts.arrays.Offset = 0,
  maxOffset: abstracts.arrays.Offset = string.length,
): boolean {
  return index.stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}
