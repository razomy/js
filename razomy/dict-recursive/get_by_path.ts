import type { DictRecursive } from './recursive';

/**
 * @summary Get a value from a nested dictionary by dot-separated path.
 * @description Traverses a recursive dictionary using a dot-separated path string,
 * returning the value at the specified location or `undefined` if the path does not exist.
 * @param dict The recursive dictionary to traverse.
 * @param path The dot-separated path string.
 * @returns The value at the specified path, or `undefined` if not found.
 * @example
 * ```ts
 * getByPath({ a: { b: { c: 42 } } }, 'a.b.c'); // => 42
 * ```
 * @example
 * ```ts
 * getByPath({ x: { y: 'hello' } }, 'x.y'); // => 'hello'
 * ```
 * @example
 * ```ts
 * getByPath({ a: { b: 1 } }, 'a.z'); // => undefined
 * ```
 * @complexity time O(n) where n is the number of segments in the path
 * @complexity memory O(1)
 */
export function getByPath(dict: DictRecursive, path: string): unknown {
  let current: unknown = dict;

  const segments: string[] = path.split('.');

  for (let i = 0; i < segments.length; i++) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }

    current = (current as DictRecursive)[segments[i]];
  }

  return current;
}
