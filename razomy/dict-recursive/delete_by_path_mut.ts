import * as dictRecursive from '@razomy/dict-recursive';

/**
 * @summary Delete a nested property from a recursive dictionary by dot-separated path.
 * @description Traverses a recursive dictionary using a dot-separated path string
 * and deletes the property at the final key. If any intermediate segment does not
 * exist or is not a nested dictionary, the operation is a no-op.
 * @param obj The recursive dictionary to mutate.
 * @param path The dot-separated path to the property to delete.
 * @throws {Error} If the path is empty.
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } } };
 * deleteByPathMut(obj, 'a.b.c');
 * obj; // => { a: { b: {} } }
 * ```
 * @example
 * ```ts
 * const obj = { x: { y: 2 }, z: 3 };
 * deleteByPathMut(obj, 'z');
 * obj; // => { x: { y: 2 } }
 * ```
 * @example
 * ```ts
 * const obj = { a: { b: 1 } };
 * deleteByPathMut(obj, 'a.nonexistent');
 * obj; // => { a: { b: 1 } } (no change)
 * ```
 * @complexity time O(n) where n is the number of path segments
 * @complexity memory O(n)
 */
export function deleteByPathMut(obj: dictRecursive.DictRecursive, path: string): void {
  if (path === '') {
    throw new Error('Path must not be empty');
  }

  const parts: string[] = path.split('.');
  const last: string = parts.pop()!;

  let target: dictRecursive.DictRecursive = obj;

  for (const part of parts) {
    const next: unknown = target[part];

    if (next === null || next === undefined || typeof next !== 'object') {
      return;
    }

    target = next as dictRecursive.DictRecursive;
  }

  delete target[last];
}
