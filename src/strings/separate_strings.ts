import {String} from "razomy/string/string";
import {Offset} from "razomy/offset/offest";

function separate_strings(string: String, offset: Offset, separate_string: String, strings: String[]) {
  let ix = string.indexOf(separate_string, offset);
  while (ix !== -1) {
    strings.push(string.substring(offset, ix + 1))
    offset = ix + 1;
    ix = string.indexOf(separate_string, offset);
  }

  if (offset < string.length) {
    strings.push(string.substring(offset))
  }

  return strings;
}

export default separate_strings;
