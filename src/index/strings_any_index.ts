import {String} from "razomy.string/string";
import {Offset} from "razomy.offset/offest";
import {Index} from "razomy.index/index_";

function strings_any_index(
  string: String,
  equal_strings: String[],
  offset: Offset = 0,
  max_offset: Offset = string.length
): Index {
  for (let i = offset; i < max_offset; i++) {
    if (equal_strings.includes(string[i])) {
      return i;
    }
  }

  return -1;
}

export default strings_any_index;
