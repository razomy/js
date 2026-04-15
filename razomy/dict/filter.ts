import * as dict from '@razomy/dict';

/**
 * @summary Filter entries of a dictionary by a predicate.
 * @description Returns a new dictionary containing only the entries for which the predicate returns true.
 * @param dict The source dictionary.
 * @param predicate A function that receives the value and key, returning true to keep the entry.
 * @returns A new filtered dictionary.
 * @example
 * ```ts
 * filter<number>({ a: 1, b: 2, c: 3 }, (v) => v > 1); // => { b: 2, c: 3 }
 * ```
 * @example
 * ```ts
 * filter<string>({ x: 'foo', y: 'bar' }, (_, k) => k === 'x'); // => { x: 'foo' }
 * ```
 * @example
 * ```ts
 * filter<number>({ a: 10, b: 20 }, () => false); // => {}
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function filter<T>(dict: dict.Dict<T>, predicate: (value: T, key: string) => boolean): dict.Dict<T> {
  const result: dict.Dict<T> = {};

  for (const key in dict) {
    if (predicate(dict[key], key)) {
      result[key] = dict[key];
    }
  }

  return result;
}
