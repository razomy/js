import {String} from "razomy.js/string/string";
import {Number} from "razomy.js/number/number";
import {space_margin_count} from "razomy.js/count/string/space_margin_count";

export function strings_space_margin_count(strings: String[]): Number[] {
  return strings.map(space_margin_count);
}
