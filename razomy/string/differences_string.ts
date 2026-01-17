import {differences} from 'razomy.differences';
import {separateStrings} from 'razomy.strings/separate_strings';
import {stringsString} from 'razomy.string/strings_string';

export function differencesString(aString: string, bString: string) {
  const aLines = separateStrings(aString, 0, '\n', []);
  const bLines = separateStrings(bString, 0, '\n', []);
  return differences(aLines, bLines, (...as) => stringsString(as));
}


