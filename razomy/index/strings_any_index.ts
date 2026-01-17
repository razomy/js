import {String} from 'razomy.string/string';
import {Offset} from 'razomy.offset/offest';
import {Index} from 'razomy.index/index_';

export function stringsAnyIndex(
  string: String,
  equalStrings: String[],
  offset: Offset = 0,
  maxOffset: Offset = string.length
): Index {
  for (let i = offset; i < maxOffset; i++) {
    if (equalStrings.includes(string[i])) {
      return i;
    }
  }

  return -1;
}


