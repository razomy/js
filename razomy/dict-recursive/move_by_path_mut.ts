import * as dictRecursive from "@razomy/dict-recursive";

/**
 * @summary Move a value from one path to another within a recursive dictionary.
 * @description Retrieves the value at `oldPath`, sets it at `newPath`, and deletes the value at `oldPath`.
 * Throws if the value at `oldPath` is `undefined`.
 * @param dict The recursive dictionary to mutate.
 * @param oldPath The dot-separated source path.
 * @param newPath The dot-separated destination path.
 * @throws {Error} If no value exists at `oldPath`.
 * @example
 * ```ts
 * const dict = { a: { b: 1 } };
 * moveByPathMut(dict, 'a.b', 'a.c');
 * // dict => { a: { c: 1 } }
 * ```
 * @example
 * ```ts
 * const dict = { x: { y: { z: 'hello' } } };
 * moveByPathMut(dict, 'x.y.z', 'x.w');
 * // dict => { x: { y: {}, w: 'hello' } }
 * ```
 * @example
 * ```ts
 * const dict = { a: 1, b: 2 };
 * moveByPathMut(dict, 'a', 'c');
 * // dict => { b: 2, c: 1 }
 * ```
 * @complexity time O(d) where d is the depth of the longest path
 * @complexity memory O(d)
 */
export function moveByPathMut(dict: dictRecursive.DictRecursive, oldPath: string, newPath: string): void {
  const value = dictRecursive.getByPath(dict, oldPath);

  if (value === undefined) {
    throw new Error(`Value at path "${oldPath}" not found.`);
  }

  dictRecursive.setByPathMut(dict, newPath, value);
  dictRecursive.deleteByPathMut(dict, oldPath);
}
