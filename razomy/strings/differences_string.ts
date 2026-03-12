import * as differences from '@razomy/differences';
import * as strings from '@razomy/strings';
import * as string from '@razomy/string';

/**
 * @summary Calculate the differences between two strings line by line.
 * @param aString The original string.
 * @param bString The compared string.
 * @returns The string representation of differences.
 * @example
 * ```ts
 * differencesString('same', 'same'); // => 'same'
 * ```
 * @example
 * ```ts
 * differencesString('old', 'new'); // => '-old\n+new'
 * ```
 * @example
 * ```ts
 * differencesString('line1\nline2', 'line1\nline3'); // => ' line1\n-line2\n+line3'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function differencesString(aString: string, bString: string) {
  const aLines = strings.separateStrings(aString, 0, '\n', []);
  const bLines = strings.separateStrings(bString, 0, '\n', []);
  return differences.differences(aLines, bLines, (...as) => string.merge(as));
}
