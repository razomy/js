import * as string_ from '@razomy/string';
import * as abstractions from "@razomy/abstractions";

export function isStringsAnyIndex(
  string: string,
  equalStrings: Set<string>,
  offset: abstractions.array.Offset = 0,
  maxOffset: abstractions.array.Offset = string.length,
): boolean {
  return string_.stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}
