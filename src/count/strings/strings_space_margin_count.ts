import {String} from "razomy.string/string";
import {Number} from "razomy.number/number";
import space_margin_count from "razomy.count/string/space_margin_count";

export function strings_space_margin_count(strings: String[]): Number[] {
  return strings.map(space_margin_count);
}

export default strings_space_margin_count;
