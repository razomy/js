import {String} from "razomy/string/string";
import {Offset} from "razomy/offset/offest";
import {Index} from "razomy/index/index_";

export function last_index(
  string: String,
  equal_string: String,
  offset: Offset = 0,
  max_offset: Offset = string.length
): Index {
  for (let i = max_offset - 1; i >= offset; i--) {
    if (string[i] === equal_string) {
      return i;
    }
  }
  return -1;
}
