import {String} from "razomy/string/string";
import {Index} from "razomy/index_/index_";
import {Number} from "razomy/number/number";

export function add_index_string(string: String, index: Index, b_string: string): String {
  return string.substring(0, index) + b_string + string.substring(index);
}

export function remove_index_string(string: String, index: Index, length: Number): String {
  return string.substring(0, index) + string.substring(index + length);
}
