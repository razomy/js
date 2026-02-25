import { create } from './create';

/**
 * Create an array of a specific size with the value 1 at the specified index.
 * @param index The index where the value 1 will be placed.
 * @param size The length of the created array.
 * @returns An array containing 1 at the specified index.
 * @example
 * ```ts
 * indexSizeCreate(0, 2); // => [1, undefined]
 * ```
 * @example
 * ```ts
 * indexSizeCreate(1, 3); // => [undefined, 1, undefined]
 * ```
 * @example
 * ```ts
 * indexSizeCreate(3, 4); // => [undefined, undefined, undefined, 1]
 * ```
 */
export function indexSizeCreate(index: number, size: number): number[] {
  const array = create(size, 0);
  array[index] = 1;
  return array;
}
