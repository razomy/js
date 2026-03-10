/**
 * @summary Check if a value is a plain object.
 * @description Determines whether the given value is a plain object — an object created by `{}`, `new Object()`, or `Object.create(null)`. Returns `false` for arrays, class instances, and other non-plain objects.
 * @param value The value to check.
 * @returns `true` if the value is a plain object, `false` otherwise.
 * @example
 * ```ts
 * isPlainObject({ a: 1, b: 2 }); // => true
 * ```
 * @example
 * ```ts
 * isPlainObject(Object.create(null)); // => true
 * ```
 * @example
 * ```ts
 * isPlainObject([1, 2, 3]); // => false
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const proto: unknown = Object.getPrototypeOf(value);

  if (proto === null) {
    return true;
  }

  return proto === Object.prototype;
}
