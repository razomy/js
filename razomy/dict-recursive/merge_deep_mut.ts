import { isObject } from '@razomy/object';
import type { DictRecursive } from '@razomy/dict-recursive';

/**
 * @summary Deep merge multiple recursive dictionaries into a target.
 * @description Recursively merges properties from one or more source dictionaries into the target dictionary. Nested objects are merged deeply rather than replaced. Primitive values in sources overwrite those in the target. Mutates the target in place.
 * @param target The target dictionary to merge into.
 * @param sources The source dictionaries to merge from.
 * @returns The mutated target dictionary with all sources deeply merged.
 * @example
 * ```ts
 * mergeDeepMut({ a: 1 }, { b: 2 }); // => { a: 1, b: 2 }
 * ```
 * @example
 * ```ts
 * mergeDeepMut({ a: { x: 1 } }, { a: { y: 2 } }); // => { a: { x: 1, y: 2 } }
 * ```
 * @example
 * ```ts
 * mergeDeepMut({ a: 1 }, { a: { nested: true } }, { b: 3 }); // => { a: { nested: true }, b: 3 }
 * ```
 * @complexity time O(n) where n is total number of keys across all sources
 * @complexity memory O(d) where d is the maximum nesting depth (recursion stack)
 */
export function mergeDeepMut<T extends DictRecursive>(target: T, ...sources: DictRecursive[]): T {
  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key in source) {
      const sourceValue = source[key];

      if (isObject(sourceValue)) {
        if (!isObject(target[key])) {
          (target as DictRecursive)[key] = {};
        }
        mergeDeepMut(target[key] as DictRecursive, sourceValue as DictRecursive);
      } else {
        (target as DictRecursive)[key] = sourceValue;
      }
    }
  }

  return target;
}
