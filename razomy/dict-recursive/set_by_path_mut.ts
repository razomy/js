import * as dict_ from '@razomy/dict';
import * as dictRecursive from '@razomy/dict-recursive';

/**
 * @summary Set a value in a nested dictionary by dot-separated path.
 * @description Traverses or creates nested objects along the dot-separated path and sets the final key to the given value.
 * @param obj The root recursive dictionary.
 * @param path The dot-separated path string.
 * @param value The value to set at the target path.
 * @returns void
 * @throws {Error} If the path is empty.
 * @example
 * ```ts
 * const obj: DictRecursive = {};
 * setByPathMut(obj, 'a.b.c', 42);
 * // obj => { a: { b: { c: 42 } } }
 * ```
 * @example
 * ```ts
 * const obj: DictRecursive = { x: { y: 1 } };
 * setByPathMut(obj, 'x.y', 2);
 * // obj => { x: { y: 2 } }
 * ```
 * @example
 * ```ts
 * const obj: DictRecursive = { a: 'old' };
 * setByPathMut(obj, 'a', 'new');
 * // obj => { a: 'new' }
 * ```
 * @complexity time O(n) where n is the number of path segments
 * @complexity memory O(n) for intermediate objects created along the path
 */
export function setByPathMut(obj: dictRecursive.DictRecursive, path: string, value: unknown): void {
  const parts: string[] = path.split('.');
  const last: string | undefined = parts.pop();

  if (last === undefined || last === '') {
    throw new Error('Path must be a non-empty string');
  }

  const target: dictRecursive.DictRecursive = parts.reduce<dictRecursive.DictRecursive>((acc, part) => {
    if (!acc[part] || !dict_.isPlainObject(acc[part])) {
      acc[part] = {};
    }
    return acc[part] as dictRecursive.DictRecursive;
  }, obj);

  target[last!] = value as any;
}
