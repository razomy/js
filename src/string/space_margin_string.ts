import {String} from "razomy.string/string";
import {Number} from "razomy.number/number";
import margin_string from "razomy.string/margin_string";

function space_margin_string(string: String, number: Number) {
  const margin = ' '.repeat(number)
  return margin_string(string, margin)
}

export default space_margin_string;
