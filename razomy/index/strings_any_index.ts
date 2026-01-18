import {String} from 'razomy.string';
import {Offset} from 'razomy.offset';
import {Index} from 'razomy.index';

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


