import {String} from 'razomy.string/string';

export function replace_string(string: String, separate_string: String, replace_string: String): String {
  return string.split(separate_string).join(replace_string);
}


