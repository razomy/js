import {Dict} from '@razomy/dict';

/**
 * Converts a dictionary to a specific string format.
 * @param dict The dictionary object.
 * @returns The formatted string.
 * @example
 * // => '{}'
 * dictToString({});
 * @example
 * // => '{a:b;}'
 * dictToString({ a: 'b' });
 * @example
 * // => '{k:v;id:1;}'
 * dictToString({ k: 'v', id: '1' });
 */
export function dictToString<T extends string>(dict: Dict<T>): string {
  let result: string = '{';
  for (const key in dict) {
    result += `${key}:${dict[key]};`;
  }
  return result + '}';
}