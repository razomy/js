import {String} from 'razomy.string';
import {Offset} from 'razomy.offset';
import {Index} from 'razomy.index';

export function stringsAnyIndex(
  string: String,
  chars: Set<string>,
  offset: Offset = 0,
  maxOffset: Offset = string.length
): Index {
  for (let i = offset; i < maxOffset; i++) {
    if (chars.has(string[i])) {
      return i;
    }
  }

  return -1;
}


