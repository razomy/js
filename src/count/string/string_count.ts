import {String} from 'razomy.string/string';
import {Number} from 'razomy.number/number';

export function string_count(string: String, equal_string: String, offset: Number, max_offset: Number): Number {
  let result = 0;
  for (let i = offset; i < max_offset; i++) {
    if (string[i] === equal_string) {
      result++;
    }
  }
  return result;
}


