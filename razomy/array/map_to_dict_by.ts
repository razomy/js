/**
 * @summary Converts an array of objects into a dictionary keyed by a specified property.
 * @description Iterates over an array of objects and creates a dictionary (Record) where the keys are the values of the specified property from each object, and the values are the objects themselves. Note that if multiple objects share the same key, the last one in the array will overwrite the previous ones.
 * @param arr The array of objects to convert.
 * @param get The property name of the objects to use as the dictionary keys.
 * @returns A dictionary mapping the specified key values to the original array elements.
 * @example
 * ```ts
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' }
 * ];
 * mapToDictBy(users, (i)=>i.id);
 * // => { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
 * ```
 * @example
 * ```ts
 * const roles = [
 *   { code: 'ADMIN', level: 1 },
 *   { code: 'USER', level: 2 }
 * ];
 * mapToDictBy(roles, (i)=>i.code);
 * // => { 'ADMIN': { code: 'ADMIN', level: 1 }, 'USER': { code: 'USER', level: 2 } }
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function mapToDictBy<T, K extends keyof T>(
  arr: T[],
  get: (i: T) => string,
): Record<string | number | symbol, T> {
  return arr.reduce((acc, item) => {
    // Correctly index item[key] and assign to accumulator
    acc[get(item)] = item;
    return acc;
  }, {} as Record<string | number | symbol, T>);
}
