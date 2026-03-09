/**
 * @summary Retrieves the own enumerable string-keyed property names of an object.
 * @description Returns an array of the object's own enumerable property names.
 * @param object The object to extract keys from.
 * @returns An array of property keys.
 * @example
 * ```ts
 * getKeys({ a: 1, b: 2 }); // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * getKeys({}); // => []
 * ```
 * @example
 * ```ts
 * getKeys({ name: 'Raz', id: 101 }); // => ['name', 'id']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function getKeys<T extends object>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}