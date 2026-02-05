import {String} from '@razomy/string';
import {Index} from '@razomy/index';
import {Number} from '@razomy/number';

export function removeIndexString(string: String, index: Index, length: Number): String {
  return string.substring(0, index) + string.substring(index + length);
}
