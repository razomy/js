import {String} from "razomy/string/string";

function is_string(string: unknown): string is String {
  return typeof string === 'string';
}

export default is_string;
