import {String} from "razomy.js/string/string";

export function is_string(string: unknown): string is String {
  return typeof string === 'string';
}
