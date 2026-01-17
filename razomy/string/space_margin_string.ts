import {String} from 'razomy.string/string';
import {Number} from 'razomy.number/number';
import {marginString} from 'razomy.string/margin_string';

export function spaceMarginString(string: String, number: Number) {
  const margin = ' '.repeat(number)
  return marginString(string, margin)
}


