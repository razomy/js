/**
 * @summary Count occurrences of elements grouped by a predicate.
 * @description Groups array elements by the result of a predicate function and counts occurrences of each group key.
 * @param array The array to iterate over.
 * @param predicate The function invoked per element to generate the grouping key.
 * @returns A record mapping each key to its count.
 * @example
 * ```ts
 * countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
 * ```
 * @example
 * ```ts
 * countBy(['one', 'two', 'three'], (v) => v.length); // => { '3': 2, '5': 1 }
 * ```
 * @example
 * ```ts
 * countBy([true, false, true, true], (v) => v); // => { 'true': 3, 'false': 1 }
 * ```
 * @complexity time O(n)
 * @complexity memory O(k) where k is the number of unique keys
 */
export function countBy<T>(array: readonly T[], predicate: (value: T) => PropertyKey): Record<string, number> {
  const result: Record<string, number> = {};

  for (let i = 0; i < array.length; i++) {
    const key = String(predicate(array[i]));

    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key]++;
    } else {
      result[key] = 1;
    }
  }

  return result;
}
