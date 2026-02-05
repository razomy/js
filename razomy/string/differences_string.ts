import {differences} from '@razomy/differences';
import {separateStrings} from '@razomy/strings';
import {stringsString} from '@razomy/string';

/**
 * Calculate the differences between two strings line by line.
 * @param {string} aString The original string.
 * @param {string} bString The compared string.
 * @returns {string} The string representation of differences.
 * @example
 * // => 'same'
 * differencesString('same', 'same');
 * @example
 * // => '-old\n+new'
 * differencesString('old', 'new');
 * @example
 * // => ' line1\n-line2\n+line3'
 * differencesString('line1\nline2', 'line1\nline3');
 */
export function differencesString(aString: string, bString: string) {
  const aLines = separateStrings(aString, 0, '\n', []);
  const bLines = separateStrings(bString, 0, '\n', []);
  return differences(aLines, bLines, (...as) => stringsString(as));
}


