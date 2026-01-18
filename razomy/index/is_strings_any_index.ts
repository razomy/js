import {String} from 'razomy.string';
import {Offset} from 'razomy.offset';
import {stringsAnyIndex} from 'razomy.index';

export function isStringsAnyIndex(
  string: String,
  equalStrings: String[],
  offset: Offset = 0,
  maxOffset: Offset = string.length
): boolean {
  return stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}


