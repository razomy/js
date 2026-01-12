import {String} from "razomy/string/string";
import {Offset} from "razomy/offset/offest";
import {strings_any_index} from "razomy/index_/strings_any_index";

export function is_strings_any_index(
  string: String,
  equal_strings: String[],
  offset: Offset = 0,
  max_offset: Offset = string.length
): boolean {
  return strings_any_index(string, equal_strings, offset, max_offset) !== -1;
}
