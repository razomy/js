import {String} from 'razomy.string/string';

export function replaceString(string: String, separateString: String, replaceString_: String): String {
  return string.split(separateString).join(replaceString_);
}


