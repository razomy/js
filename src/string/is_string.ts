import {String} from "razomy/string/string";

export function is_string(string: unknown): string is String {
  return typeof string === 'string';
}
