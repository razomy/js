/**
 * Creates a new array populated with the results of calling a provided function on every element in the input array.
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns A new array with the transformed elements.
 * @example
 * // => [2, 4, 6]
 * map([1, 2, 3], (n) => n * 2);
 * @example
 * // => ['1', '2', '3']
 * map([1, 2, 3], String);
 * @example
 * // => ['a0', 'b1']
 * map(['a', 'b'], (char, index) => char + index);
 */
export function map<T, U>(array: T[], iteratee: (element: T, index: number, array: T[]) => U): U[] {
  const length = array.length;
  const result = new Array<U>(length);

  for (let index = 0; index < length; index++) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}