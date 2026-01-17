import {String} from 'razomy.string/string';
import {Index} from 'razomy.index/index_';
import {Number} from 'razomy.number/number';

export function removeIndexString(string: String, index: Index, length: Number): String {
  return string.substring(0, index) + string.substring(index + length);
}
