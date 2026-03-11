/**
 * @summary Iterate over dictionary entries, invoking a callback for each key-value pair.
 * @description Iterates over own enumerable string-keyed properties of a dictionary,
 * calling the provided iteratee with the value, key, and the dictionary itself.
 * Iteration can be terminated early by returning `false` from the iteratee.
 * @param dict The dictionary to iterate over.
 * @param iteratee The function invoked per iteration. Receives (value, key, dict). Return `false` to break.
 * @returns The original dictionary.
 * @example
 * ```ts
 * const logs = [];
 * iterate({ a: 1, b: 2 }, (value, key) => { logs.push([key, value]); });
 * logs; // => [["a", 1], ["b", 2]]
 * ```
 * @example
 * ```ts
 * const logs = [];
 * iterate({ x: 10, y: 20, z: 30 }, (value) => {
 *   if (value >= 20) return false;
 *   logs.push(value);
 * });
 * logs; // => [10]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function iterate<T extends Record<string, unknown>>(
  dict: T,
  iteratee: (value: T[keyof T], key: string, dict: T) => unknown,
): T {
  const obj: T = Object(dict);
  const keys: string[] = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i];
    const result: unknown = iteratee(obj[key as keyof T], key, obj);

    if (result === false) {
      break;
    }
  }

  return obj;
}
