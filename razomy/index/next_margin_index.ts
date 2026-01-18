import {String} from 'razomy.string';
import {Offset} from 'razomy.offset';
import {Index} from 'razomy.index';

export function nextMarginIndex(
  string: String,
  equalString: String,
  offset: Offset = 0,
  maxOffset: Offset = string.length): Index {
  let i = offset;
  for (; i < maxOffset; i++) {
    if (equalString == string[i]) {

    } else {
      return i;
    }
  }

  return i;
}


