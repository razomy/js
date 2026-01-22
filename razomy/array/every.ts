/**
 * Checks if all elements in the array satisfy the provided testing function.
 * @param array The array to iterate over.
 * @param predicate The function to test for each element.
 * @returns True if all elements pass the test, otherwise false.
 * @example
 * // => true
 * every([2, 4, 6], (n) => n % 2 === 0);
 * @example
 * // => false
 * every([2, 4, 7], (n) => n % 2 === 0);
 * @example
 * // => true
 * every([], (n) => n > 5);
 */
export function every<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean
): boolean {
  for (let index = 0; index < array.length; index++) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }

  return true;
}