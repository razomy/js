import {String} from 'razomy.string/string';
import {Offset} from 'razomy.offset/offest';
import {stringsAnyIndex} from 'razomy.index/strings_any_index';

export function isStringsAnyIndex(
  string: String,
  equalStrings: String[],
  offset: Offset = 0,
  maxOffset: Offset = string.length
): boolean {
  return stringsAnyIndex(string, equalStrings, offset, maxOffset) !== -1;
}


