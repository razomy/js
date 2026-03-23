import * as string from '@razomy/string';
import * as offset from '../abstracts/arrays/offest';
import * as index from '@razomy/index';

export function isStringsAnyIndex(
  string: string.String,
  equalStrings: Set<string>,
  offset: offset.Offset = 0,
  maxOffset: offset.Offset = string.length,
): boolean {
  return index.stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}
