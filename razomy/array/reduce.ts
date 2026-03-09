/**
 * @summary Executes a reducer function on each element of the array, resulting in a single output value.
 * @param array The array to process.
 * @param reducer The function to execute on each element.
 * @param initialValue The initial value of the accumulator.
 * @returns The accumulated result.
 * @example
 * ```ts
 * reduce([1, 2, 3, 4], (acc, val) => acc + val, 0);
 * // => 10
 * ```
 * @example
 * ```ts
 * reduce([['a', 1], ['b', 2]], (acc, [key, val]) => ({ ...acc, [key]: val }), {});
 * // => { a: 1, b: 2 }
 * ```
 * @example
 * ```ts
 * reduce([1, 2, 3], (acc, val) => { acc.push(val * 2); return acc; }, []);
 * // => [2, 4, 6]
 * ```
 */
export function reduce<T, A>(
  array: T[],
  reducer: (accumulator: A, value: T, index: number, array: T[]) => A,
  initialValue: A,
): A {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
  }
  return accumulator;
}
