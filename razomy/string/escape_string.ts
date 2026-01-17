import {replaceString} from 'razomy.string/replace_string';
import {String} from 'razomy.string/string';

export function escapeString(string: String, separateString: String): String {
  return replaceString(string, separateString, '\\' + separateString);
}


