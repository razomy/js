import {String} from "razomy.js/string/string";
import {Number} from "razomy.js/number/number";

export function space_margin_count(string: String): Number {
  let i = 0;
  for (let chr of string) {
    if (chr == ' ') {
      i++;
    } else {
      return i;
    }
  }
  return i;
}
