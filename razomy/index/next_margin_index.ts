import {String} from 'razomy.string/string';
import {Offset} from 'razomy.offset/offest';
import {Index} from 'razomy.index/index_';

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


