/**
 * @summary Retrieves the value associated with a specific key from a dictionary.
 * @description Returns the value assigned to the provided key in the dictionary. If the key does not exist, returns undefined.
 * @param dict The dictionary object.
 * @param attr The key to look up.
 * @returns The value associated with the key.
 * @example
 * ```ts
 * get({ a: 1 }, 'a'); // => 1
 * ```
 * @example
 * ```ts
 * get({ b: 'hello' }, 'b'); // => 'hello'
 * ```
 * @example
 * ```ts
 * get({ c: null }, 'c'); // => null
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function get<T extends Record<PropertyKey, any>>(dict: T, attr: keyof T): T[keyof T] | undefined {
  return dict[attr];
}