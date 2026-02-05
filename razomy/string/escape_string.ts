import {replaceString} from '@razomy/string';
import {String} from '@razomy/string';

export function escapeString(string: String, separateString: String): String {
  return replaceString(string, separateString, '\\' + separateString);
}


