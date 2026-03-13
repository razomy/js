import * as dict_ from '@razomy/dict';
import * as dictRecursive from '@razomy/dict-recursive';

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
export function mergeDeepMut<T extends dictRecursive.DictRecursive>(
  target: T,
  ...sources: dictRecursive.DictRecursive[]
): T {
  for (const source of sources) {
    if (!dict_.isPlainObject(source)) continue;

    for (const key in source) {
      const sourceValue = source[key];

      if (dict_.isPlainObject(sourceValue)) {
        if (!dict_.isPlainObject(target[key])) {
          (target as dictRecursive.DictRecursive)[key] = {};
        }
        mergeDeepMut(target[key] as dictRecursive.DictRecursive, sourceValue as dictRecursive.DictRecursive);
      } else {
        (target as dictRecursive.DictRecursive)[key] = sourceValue;
      }
    }
  }

  return target;
}
