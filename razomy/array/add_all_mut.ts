/**
 * @summary Add elements to the end of an array, modifying the original array.
 * @description Add elements to the end of an array, modifying the original array.
 * @param array The array to modify.
 * @param value The value to add.
 * @returns The modified array.
 * @example
 * ```ts
 * const array = [1, 2];
 * addAllMut(array, [3]);
 * array; // => [1, 2, 3]
 * ```
 * @example
 * ```ts
 * const array = ['a']
 * addAllMut(array, ['b']);
 * array; // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * const array = [{ id: 1 }];
 * addAllMut(array, [{ id: 2 }]);
 * array; // => [{ id: 1 }, { id: 2 }]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function addAllMut<T>(array: T[], value: T[]): T[] {
    array.push(...value);
    return array;
}
