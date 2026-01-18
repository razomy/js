import {replaceString} from 'razomy.string';
import {String} from 'razomy.string';

export function unescapeString(string: String, separateString: String): String {
  return replaceString(string, '\\' + separateString, separateString);
}


