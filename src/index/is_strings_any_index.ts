import {String} from "razomy.js/string/string";
import {Offset} from "razomy.js/offset/offest";
import {strings_any_index} from "razomy.js/index/strings_any_index";

export function is_strings_any_index(
  string: String,
  equal_strings: String[],
  offset: Offset = 0,
  max_offset: Offset = string.length
): boolean {
  return strings_any_index(string, equal_strings, offset, max_offset) !== -1;
}
