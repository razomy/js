import {String} from "razomy.js/string/string";

export function snake_case_string(string: String) {
  return string
    .split(/ |-|\B(?=[A-Z]{1:}+)/)
    .map(word => word.toLowerCase())
    .join('_');
}
