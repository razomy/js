import {String} from 'razomy.string/string';
import {Index} from 'razomy.index/index_';

export function addIndexString(string: String, index: Index, bString: string): String {
  return string.substring(0, index) + bString + string.substring(index);
}
