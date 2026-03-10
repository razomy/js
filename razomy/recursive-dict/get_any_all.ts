import type { Dict } from '@razomy/dict';
import { isKeys } from '@razomy/dict';
import { isObject } from '@razomy/object';

/**
 * @summary Recursively find all paths in a nested dict where the specified keys exist.
 * @description Traverses a nested dictionary (objects and arrays) and collects all colon-separated
 * paths leading to nodes that contain all of the specified keys.
 * @param dict The nested dictionary to search.
 * @param keys The keys that must all be present at a node.
 * @returns An array of colon-separated path strings to matching nodes.
 * @example
 * ```ts
 * getAnyAll({ a: 1, b: 2 }, ['a', 'b']); // => ['']
 * ```
 * @example
 * ```ts
 * getAnyAll({ x: { a: 1, b: 2 } }, ['a', 'b']); // => ['x:']
 * ```
 * @example
 * ```ts
 * getAnyAll({ x: { y: { a: 1, b: 2 } }, z: { a: 1, b: 2 } }, ['a', 'b']);
 * // => ['x:y:', 'z:']
 * ```
 * @complexity time O(n * k) where n is total number of nodes and k is length of keys
 * @complexity memory O(n * d) where d is max depth of nesting
 */
export function getAnyAll(dict: Dict<unknown>, keys: string[]): string[] {
  const result: string[] = [];

  if (isKeys(dict, keys)) {
    result.push('');
  }

  if (Array.isArray(dict)) {
    for (let i = 0; i < dict.length; i++) {
      const children = getAnyAll(dict[i] as Dict<unknown>, keys);
      for (const child of children) {
        result.push(`${i}${child}`);
      }
    }
  } else if (isObject(dict)) {
    for (const key in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        const children = getAnyAll(dict[key] as Dict<unknown>, keys);
        for (const child of children) {
          result.push(`${key}:${child}`);
        }
      }
    }
  }

  return result;
}
