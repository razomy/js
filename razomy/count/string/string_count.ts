import {String} from 'razomy.string/string';
import {Number} from 'razomy.number/number';

export function stringCount(string: String, equalString: String, offset: Number, maxOffset: Number): Number {
  let result = 0;
  for (let i = offset; i < maxOffset; i++) {
    if (string[i] === equalString) {
      result++;
    }
  }
  return result;
}


