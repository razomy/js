import {String} from 'razomy.string';
import {Offset} from 'razomy.offset';
import {Index} from 'razomy.index';

export function lastIndex(
  string: String,
  equalString: String,
  offset: Offset = 0,
  maxOffset: Offset = string.length
): Index {
  for (let i = maxOffset - 1; i >= offset; i--) {
    if (string[i] === equalString) {
      return i;
    }
  }
  return -1;
}


