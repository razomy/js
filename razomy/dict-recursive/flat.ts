import { isPlainObject, iterate } from '@razomy/dict';

export type Join<K, P> = K extends string ? (P extends string ? `${K}${'' extends P ? '' : '.'}${P}` : never) : never;

export type PathsValue<T, PrevK extends string | number | symbol> = T extends object
  ? {
      [K in keyof T]-?: PathsValue<T[K], Join<PrevK, K & string>>;
    }[keyof T]
  : { [K in PrevK]: T };

export type FlattenedAndConverted<T extends object> = {
  [K in keyof T]-?: PathsValue<T[K], K & string>;
}[keyof T];

/**
 * @summary Flatten a nested object into a single-level object with dot-separated keys.
 * @description Recursively traverses a nested plain object and produces a flat object
 * where each key is a dot-delimited path representing the original nesting structure.
 * Non-plain-object values are preserved as leaf values.
 * @param obj The nested object to flatten.
 * @param parentKey The prefix for keys (used internally for recursion).
 * @param result The accumulator object (used internally for recursion).
 * @returns A flat object with dot-separated keys.
 * @example
 * ```ts
 * flat({ a: 1, b: 2 }); // => { a: 1, b: 2 }
 * ```
 * @example
 * ```ts
 * flat({ a: { b: { c: 3 } } }); // => { 'a.b.c': 3 }
 * ```
 * @example
 * ```ts
 * flat({ x: { y: 1 }, z: [2, 3] }); // => { 'x.y': 1, z: [2, 3] }
 * ```
 * @complexity time O(n) where n is the total number of leaf values
 * @complexity memory O(n)
 */
export function flat<T extends Record<string, unknown> = Record<string, unknown>>(
  obj: T,
  parentKey: string = '',
  result: Record<string, unknown> = {},
): FlattenedAndConverted<T> {
  iterate(obj, (value: unknown, key: string) => {
    const newKey: string = parentKey ? `${parentKey}.${key}` : key;

    if (isPlainObject(value)) {
      flat(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  });

  return result as FlattenedAndConverted<T>;
}
