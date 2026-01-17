import {String} from 'razomy.string/string';
import {Offset} from 'razomy.offset/offest';

export function separateStrings(string: String, offset: Offset, separateString: String, strings: String[]) {
  let ix = string.indexOf(separateString, offset);
  while (ix !== -1) {
    strings.push(string.substring(offset, ix + 1))
    offset = ix + 1;
    ix = string.indexOf(separateString, offset);
  }

  if (offset < string.length) {
    strings.push(string.substring(offset))
  }

  return strings;
}


