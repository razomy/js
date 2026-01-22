/**
 * Executes a reducer function on each element of the array, resulting in a single output value.
 * @param {T[]} array The array to process.
 * @param {(accumulator: A, value: T, index: number, array: T[]) => A} reducer The function to execute on each element.
 * @param {A} initialValue The initial value of the accumulator.
 * @returns {A} The accumulated result.
 * @example
 * // => 10
 * reduce([1, 2, 3, 4], (acc, val) => acc + val, 0);
 * @example
 * // => { a: 1, b: 2 }
 * reduce([['a', 1], ['b', 2]], (acc, [key, val]) => ({ ...acc, [key]: val }), {});
 * @example
 * // => [2, 4, 6]
 * reduce([1, 2, 3], (acc, val) => { acc.push(val * 2); return acc; }, []);
 */
export function reduce<T, A>(
  array: T[],
  reducer: (accumulator: A, value: T, index: number, array: T[]) => A,
  initialValue: A
): A {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
  }
  return accumulator;
}