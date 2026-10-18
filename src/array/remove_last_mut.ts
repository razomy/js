/**
 * @summary Remove elements from the end of an array.
 * @description Update same array with the last element(s) removed. An optional `deltaIndex` adjusts how many elements are kept relative to removing just the last one.
 * @param arr The source array.
 * @param deltaIndex Offset applied to the slice end. Defaults to `0` (remove last element). Negative values remove additional elements.
 * @returns A new array with the trailing element(s) removed.
 * @example
 * ```ts
 * removeLastMut([1, 2, 3]); // => [1, 2]
 * ```
 * @example
 * ```ts
 * removeLastMut([1, 2, 3], -1); // => [1]
 * ```
 * @example
 * ```ts
 * removeLastMut(['a', 'b', 'c', 'd'], 0); // => ['a', 'b', 'c']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function removeLastMut<T>(arr: Array<T>, deltaIndex: number = 0): T[] {
    const end: number = arr.length - 1 + deltaIndex;
    if (end <= 0) {
    return [];
    }

    arr.pop();
    return arr;
}
