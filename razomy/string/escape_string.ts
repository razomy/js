import type {String} from '@razomy/string';
import {replaceString} from '@razomy/string';

export function escapeString(string: String, separateString: String): String {
  return replaceString(string, separateString, '\\' + separateString);
}


