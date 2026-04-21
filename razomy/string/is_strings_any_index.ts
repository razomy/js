import * as string_ from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function isStringsAnyIndex(
  string: string_.String,
  equalStrings: Set<string>,
  offset: abstracts.arrays.Offset = 0,
  maxOffset: abstracts.arrays.Offset = string.length,
): boolean {
  return string_.stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}
