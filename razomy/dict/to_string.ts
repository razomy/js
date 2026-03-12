import * as dict from "@razomy/dict";

/**
 * Converts a dictionary to a specific string format.
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
 */
export function toString_<T extends string>(dict: dict.Dict<T>): string {
  let result: string = '{';
  for (const key in dict) {
    result += `${key}:${dict[key]};`;
  }
  return result + '}';
}
