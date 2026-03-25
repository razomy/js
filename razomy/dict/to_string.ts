import * as dict from '@razomy/dict';

/**
 * @summary Converts a dictionary to a specific string format.
 * @description Converts a dictionary to a specific string format.
 * @param dict The dictionary object.
 * @returns The formatted string.
 * @example
 * ```ts
 * dictToString({}); // => '{}'
 * ```
 * @example
 * ```ts
 * dictToString({ a: 'b' }); // => '{a:b;}'
 * ```
 * @example
 * ```ts
 * dictToString({ k: 'v', id: '1' }); // => '{k:v;id:1;}'
 * ```
 * @complexity time O(k) where k is number of keys
 * @complexity memory O(k)
 */
export function toString_<T extends string>(dict: dict.Dict<T>): string {
  let result: string = '{';
  for (const key in dict) {
    result += `${key}:${dict[key]};`;
  }
  return result + '}';
}
