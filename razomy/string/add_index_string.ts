import {String} from 'razomy.string/string';
import {Index} from 'razomy.index/index_';

export function add_index_string(string: String, index: Index, b_string: string): String {
  return string.substring(0, index) + b_string + string.substring(index);
}
