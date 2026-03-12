import * as dict_ from "@razomy/dict";
import * as object_ from "@razomy/object";

/**
 * @summary Recursively find all paths in a nested dict that contain the specified keys.
 * @description Traverses a nested dictionary (objects and arrays) and returns an array of
 * colon-separated paths leading to nodes that contain all of the specified keys.
 * @param dict The nested dictionary to search.
 * @param keys The keys to match against each node.
 * @returns An array of colon-separated path strings pointing to matching nodes.
 * @example
 * ```ts
 * getAny({ a: { name: 'x', id: 1 } }, ['name', 'id']);
 * // => ['a:']
 * ```
 * @example
 * ```ts
 * getAny({ a: { b: { name: 'x', id: 1 } } }, ['name', 'id']);
 * // => ['a:b:']
 * ```
 * @example
 * ```ts
 * getAny({ a: 'hello', b: { name: 'y' } }, ['name']);
 * // => ['b:']
 * ```
 * @complexity time O(n) where n is the total number of nodes in the nested structure
 * @complexity memory O(d) where d is the maximum depth of the nested structure
 */
export function getAny(dict: dict_.Dict<unknown>, keys: string[]): string[] {
  if (dict_.isKeys(dict, keys)) {
    return [''];
  }

  if (Array.isArray(dict)) {
    const result: string[] = [];
    for (let index = 0; index < dict.length; index++) {
      const children = getAny(dict[index] as dict_.Dict<unknown>, keys);
      for (const child of children) {
        result.push(`${index}:${child}`);
      }
    }
    return result;
  }

  if (object_.isObject(dict)) {
    const result: string[] = [];
    for (const key in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        const children = getAny(dict[key] as dict_.Dict<unknown>, keys);
        for (const child of children) {
          result.push(`${key}:${child}`);
        }
      }
    }
    return result;
  }

  return [];
}
