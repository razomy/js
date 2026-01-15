import {String} from 'razomy.string/string';
import {Number} from 'razomy.number/number';
import {margin_string} from 'razomy.string/margin_string';

export function space_margin_string(string: String, number: Number) {
  const margin = ' '.repeat(number)
  return margin_string(string, margin)
}


