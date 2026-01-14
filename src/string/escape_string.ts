import replace_string from "razomy.string/replace_string";
import {String} from "razomy.string/string";

export function escape_string(string: String, separate_string: String): String {
  return replace_string(string, separate_string, '\\' + separate_string);
}

export default escape_string;
