import {String} from "razomy/string/string";
import {Offset} from "razomy/offset/offest";
import {Index} from "razomy/index/index_";

export function next_margin_index(
  string: String,
  equal_string: String,
  offset: Offset = 0,
  max_offset: Offset = string.length): Index {
  let i = offset;
  for (; i < max_offset; i++) {
    if (equal_string == string[i]) {
      continue;
    } else {
      return i;
    }
  }

  return i;
}