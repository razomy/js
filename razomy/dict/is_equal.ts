/**
 * @summary Performs a deep equality comparison between two values.
 * @description Compares two values to determine if they are deeply equal. It first evaluates the `.equals()` method if available on the first argument (useful for classes or instances like ObjectIds). If both arguments are objects and not null, it recursively compares all of their properties.
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns True if the values are deeply equal, otherwise false.
 * @example
 * ```ts
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { a: 1, b: { c: 2 } };
 * isEqual(obj1, obj2);
 * // => true
 * ```
 * @example
 * ```ts
 * const obj1 = { a: 1 };
 * const obj2 = { a: 1, b: 2 };
 * isEqual(obj1, obj2);
 * // => false
 * ```
 * @example
 * ```ts
 * class CustomId {
 *   constructor(id) { this.id = id; }
 *   equals(other) { return this.id === other.id; }
 * }
 * isEqual(new CustomId(1), new CustomId(1));
 * // => true
 * ```
 * @complexity time O(n) - where n is the total number of nested properties (due to recursive traversal).
 * @complexity memory O(d) - where d is the maximum depth of the nested objects (due to the call stack).
 */
export function isEqual(a: any, b: any): boolean {
  if (a?.equals && a.equals(b)) return true; // Note: safely handles if .equals exists, based on typical usage

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
