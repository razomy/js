import {String} from 'razomy.string';
import {Number} from 'razomy.number';

export function spaceMarginCount(string: String): Number {
  let i = 0;
  for (let chr of string) {
    if (chr == ' ') {
      i++;
    } else {
      return i;
    }
  }
  return i;
}


