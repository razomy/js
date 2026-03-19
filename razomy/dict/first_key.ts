import type { Dict } from './dict';
import * as exceptions from '@razomy/exceptions';

/**
 * @summary Get the first own key of a dictionary.
 * @description Returns the first own enumerable key of the given dictionary. Throws if the dictionary has no own keys.
 * @param obj The dictionary to get the first key from.
 * @returns The first own enumerable key as a string.
 * @throws {exceptions.ArgumentException} If the dictionary has no own keys.
 * @example
 * ```ts
 * firstKey({ a: 1, b: 2 }); // => 'a'
 * ```
 * @example
 * ```ts
 * firstKey({ name: 'Alice' }); // => 'name'
 * ```
 * @example
 * ```ts
 * firstKey({}); // => throws ArgumentException('no keys in object')
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */

export function firstKey<T>(obj: Dict<T>): string {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  throw new exceptions.ArgumentException('no keys in object', obj as {});
}
