import {String} from "razomy.js/string/string";
import {Number} from "razomy.js/number/number";
import {margin_string} from "razomy.js/string/margin_string";

export function space_margin_string(string: String, number: Number) {
  const margin = ' '.repeat(number)
  return margin_string(string, margin)
}