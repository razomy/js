import * as dict from '@razomy/dict';
import * as abstracts from '@razomy/abstracts';

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
export function mergeMut<T extends abstracts.structures.RecursiveDict>(
  target: T,
  ...sources: abstracts.structures.RecursiveDict[]
): T {
  for (const source of sources) {
    if (!dict.isPlainObject(source)) continue;

    for (const key in source) {
      const sourceValue = source[key];

      if (dict.isPlainObject(sourceValue)) {
        if (!dict.isPlainObject(target[key])) {
          (target as abstracts.structures.RecursiveDict)[key] = {};
        }
        mergeMut(target[key] as abstracts.structures.RecursiveDict, sourceValue as abstracts.structures.RecursiveDict);
      } else {
        (target as abstracts.structures.RecursiveDict)[key] = sourceValue;
      }
    }
  }

  return target;
}
