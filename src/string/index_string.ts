import {String} from "razomy.js/string/string";
import {Index} from "razomy.js/index";
import {Number} from "razomy.js/number/number";

export function add_index_string(string: String, index: Index, b_string: string): String {
  return string.substring(0, index) + b_string + string.substring(index);
}

export function remove_index_string(string: String, index: Index, length: Number): String {
  return string.substring(0, index) + string.substring(index + length);
}
