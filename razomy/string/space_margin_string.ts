import {String} from 'razomy.string';
import {Number} from 'razomy.number';
import {marginString} from 'razomy.string';

export function spaceMarginString(string: String, number: Number) {
  const margin = ' '.repeat(number)
  return marginString(string, margin)
}


