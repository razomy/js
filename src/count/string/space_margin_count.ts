import {String} from "razomy/string/string";
import {Number} from "razomy/number/number";

function space_margin_count(string: String): Number {
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

export default space_margin_count;
