// AUTO-GENERATED CLASS FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as array from '@razomy/array';

export class ArrayExtension {
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
  public addAllMut<T>(this: T[], value: T[]): T[] {
    return array.addAllMut(this, value);
  }

  /**
   * @summary Add an element to the end of an array, modifying the original array.
   * @description Add an element to the end of an array, modifying the original array.
   * @param array The array to modify.
   * @param value The value to add.
   * @returns The modified array.
   * @example
   * ```ts
   * const array = [1, 2];
   * addMut(array, 3);
   * array; // => [1, 2, 3]
   * ```
   * @example
   * ```ts
   * const array = ['a']
   * addMut(array, 'b');
   * array; // => ['a', 'b']
   * ```
   * @example
   * ```ts
   * const array = [{ id: 1 }];
   * addMut(array, { id: 2 });
   * array; // => [{ id: 1 }, { id: 2 }]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public addMut<T>(this: T[], value: T): T[] {
    return array.addMut(this, value);
  }

  public and(this: boolean[]): boolean {
    return array.and(...this);
  }

  /**
   * @summary Splits an array into smaller arrays (chunks) of a specified size.
   * @description The last chunk may be smaller than the `size`.
   * @param array The array to process.
   * @param size The length of each chunk. Must be a positive integer.
   * @returns A new array of chunked arrays.
   * @example
   * ```ts
   * chunk([1, 2, 3, 4, 5], 2); // => [[1, 2], [3, 4], [5]]
   * ```
   * @example
   * ```ts
   * chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3); // => [['a', 'b', 'c'], ['d', 'e', 'f']]
   * ```
   * @example
   * ```ts
   * chunk([true, false], 5); // => [[true, false]]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public chunk<T>(this: T[], size: number): T[][] {
    return array.chunk(this, size);
  }

  /**
   * @summary Count occurrences of elements grouped by a predicate.
   * @description Groups array elements by the result of a predicate function and counts occurrences of each group key.
   * @param array The array to iterate over.
   * @param predicate The function invoked per element to generate the grouping key.
   * @returns A record mapping each key to its count.
   * @example
   * ```ts
   * countBy([6.1, 4.2, 6.3], Math.floor); // => { '4': 1, '6': 2 }
   * ```
   * @example
   * ```ts
   * countBy(['one', 'two', 'three'], (v) => v.length); // => { '3': 2, '5': 1 }
   * ```
   * @example
   * ```ts
   * countBy([true, false, true, true], (v) => v); // => { 'true': 3, 'false': 1 }
   * ```
   * @complexity time O(n)
   * @complexity memory O(k) where k is the number of unique keys
   */
  public countBy<T>(this: ReadonlyArray<T>, predicate?: (value: T) => any): Record<string, number> {
    return array.countBy(this, predicate);
  }

  /**
   * @summary Computes the difference between two arrays.
   * @description Returns a new array with elements that are in the first array but not in the second array.
   * The order of elements in the result is determined by the order in the first array.
   * @template T The type of elements in the arrays.
   * @param source The array to compare against.
   * @param other The array to subtract from the source.
   * @returns A new array containing elements unique to the source array.
   * @example
   * ```ts
   * difference([1, 2, 3], [2, 4]); // => [1, 3]
   * ```
   * @example
   * ```ts
   * difference(['apple', 'banana', 'orange'], ['orange', 'grape']); // => ['apple', 'banana']
   * ```
   * @example
   * ```ts
   * difference([1, 2, 3, 4, 5], [2, 3, 4]); // => [1, 5]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public difference<T>(this: T[], other: T[]): T[] {
    return array.difference(this, other);
  }

  /**
   * @summary Creates a slice of array with n elements dropped from the beginning.
   * @description Creates a slice of array with n elements dropped from the beginning.
   * @param array The source array.
   * @param count The number of elements to drop.
   * @returns Returns the new array.
   * @example
   * ```ts
   * drop([1, 2, 3], 1); // => [2, 3]
   * ```
   * @example
   * ```ts
   * drop([1, 2, 3], 2); // => [3]
   * ```
   * @example
   * ```ts
   * drop([1, 2, 3], 5); // => []
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public drop<T>(this: T[], count: number): T[] {
    return array.drop(this, count);
  }

  /**
   * @summary Checks if all elements in the array satisfy the provided testing function.
   * @description Checks if all elements in the array satisfy the provided testing function.
   * @param array The array to iterate over.
   * @param predicate The function to test for each element.
   * @returns True if all elements pass the test, otherwise false.
   * @example
   * ```ts
   * every([2, 4, 6], (n) => n % 2 === 0); // => true
   * ```
   * @example
   * ```ts
   * every([2, 4, 7], (n) => n % 2 === 0); // => false
   * ```
   * @example
   * ```ts
   * every([], (n) => n > 5); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public every<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean {
    return array.every(this, predicate);
  }

  public filter(this: any[], predicate: (value: any, index: number, array: any[]) => any): any[] {
    return array.filter(this, predicate);
  }

  /**
   * @summary Returns the index of the first element in the array that satisfies the provided testing function.
   * @description Returns the index of the first element in the array that satisfies the provided testing function.
   * @template T
   * @param array The array to search.
   * @param predicate The function to execute on each value.
   * @returns The index of the first element that passes the test, otherwise throws.
   * @throws {Error} If the item is not found.
   * @example
   * ```ts
   * findIndex([1, 2, 3], (x) => x === 2); // => 1
   * ```
   * @example
   * ```ts
   * findIndex(['a', 'b', 'c'], (x) => x !== 'b'); // => 0
   * ```
   * @example
   * ```ts
   * findIndex([1, 2, 3], (x) => x > 5); // => -1
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public findIndex<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): number {
    return array.findIndex(this, predicate);
  }

  /**
   * @summary Find an item in an array that matches the predicate.
   * @description Find an item in an array that matches the predicate. Throws an error if no item is found.
   * @template T
   * @param array The array to search.
   * @param predicate The function invoked per iteration.
   * @returns The found item.
   * @throws {Error} If the item is not found.
   * @example
   * ```ts
   * find([1, 2, 3], (n) => n === 2); // => 2
   * ```
   * @example
   * ```ts
   * find([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => { id: 1 }
   * ```
   * @example
   * ```ts
   * find([1, 2, 3], (n) => n === 4); // => Error: Item not found.
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public find<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): T {
    return array.find(this, predicate);
  }

  /** first index */
  public firstEqualIndexes<T>(this: T[], b: T[], startA?: number, startB?: number): number[] {
    return array.firstEqualIndexes(this, b, startA, startB);
  }

  /**
   * @summary Flattens an array of nested arrays by one level.
   * @description Flattens an array of nested arrays by one level.
   * @param array The array to flatten.
   * @returns The flattened array.
   * @example
   * ```ts
   * flat([[1, 2], [3, 4]]); // => [1, 2, 3, 4]
   * ```
   * @example
   * ```ts
   * flat([1, 2, [3, [4]]]); // => [1, 2, 3, [4]]
   * ```
   * @example
   * ```ts
   * flat([['a'], 'b']); // => ['a', 'b']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public flat<T>(this: readonly (T | ReadonlyArray<T>)[]): T[] {
    return array.flat(this);
  }

  /**
   * @summary Get the first element of an array.
   * @description Get the first element of an array.
   * @param array The array to get the first element from.
   * @returns The first element.
   * @throws {Error} If the array is empty.
   * @example
   * ```ts
   * getFirst([1, 2, 3]); // => 1
   * ```
   * @example
   * ```ts
   * getFirst(['a', 'b', 'c']); // => 'a'
   * ```
   * @example
   * ```ts
   * getFirst([]); // => Error: Array is empty
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public getFirst<T>(this: T[]): T {
    return array.getFirst(this);
  }

  /**
   * @summary Retrieves the last element of an array.
   * @description Optionally accepts an offset to retrieve preceding elements.
   * Throws an error if the element is not found (e.g., empty array or out of bounds).
   * @template T The type of elements in the array.
   * @param array The input array.
   * @param offset The zero-based offset from the end (0 is the last item, 1 is the second to last).
   * @returns The element at the calculated position.
   * @throws {Error} If the element does not exist.
   * @example
   * ```ts
   * getLast([1, 2, 3]); // => 3
   * ```
   * @example
   * ```ts
   * getLast(['a', 'b', 'c'], 1); // => 'b'
   * ```
   * @example
   * ```ts
   * getLast([1, 2, 3], 10); // => Error: Element at offset 10 does not exist.
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public getLast<T>(this: T[], offset?: number): T {
    return array.getLast(this, offset);
  }

  /**
   * @summary Groups the elements of an array according to the result of the iteratee function.
   * @description Groups the elements of an array according to the result of the iteratee function.
   * @param array The array to iterate over.
   * @param iteratee The function invoked per iteration to generate the key.
   * @returns The object with grouped arrays.
   * @example
   * ```ts
   * groupBy([6.1, 4.2, 6.3], Math.floor);
   * // => { '4': [4.2], '6': [6.1, 6.3] }
   * ```
   * @example
   * ```ts
   * groupBy(['one', 'two', 'three'], (s) => s.length);
   * // => { '3': ['one', 'two'], '5': ['three'] }
   * ```
   * @example
   * ```ts
   * groupBy([{ k: 'a', v: 1 }, { k: 'b', v: 2 }], (o) => o.k);
   * // => { 'a': [{ k: 'a', v: 1 }], 'b': [{ k: 'b', v: 2 }] }
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public groupBy<T, K extends PropertyKey>(this: T[], iteratee: (item: T) => K): Record<K, T[]> {
    return array.groupBy(this, iteratee);
  }

  /**
   * @summary Check if the source array contains all elements of the sub array in the same relative order.
   * @description Check if the source array contains all elements of the sub array in the same relative order.
   * @param source The array to search in.
   * @param target The sequence of elements to look for.
   * @returns True if the subsequence exists.
   * @example
   * ```ts
   * hasArray([1, 2, 3, 4], [2, 4]); // => true
   * ```
   * @example
   * ```ts
   * hasArray(['a', 'b', 'c'], ['c', 'a']); // => false
   * ```
   * @example
   * ```ts
   * hasArray([true, false], []); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public hasArray<T>(this: T[], target: T[]): boolean {
    return array.hasArray(this, target);
  }

  /**
   * @summary Checks if an item matching the predicate exists in the array.
   * @description Checks if an item in an array matches the predicate. Returns `true` if found, otherwise `false`.
   * @template T
   * @param array The array to search.
   * @param predicate The function invoked per iteration.
   * @returns True if a matching item is found, otherwise false.
   * @example
   * ```ts
   * has([1, 2, 3], (n) => n === 2); // => true
   * ```
   * @example
   * ```ts
   * has([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => true
   * ```
   * @example
   * ```ts
   * has([1, 2, 3], (n) => n === 4); // => false
   * ```
   * @complexity time O(n)
   * @complexity memory O(1)
   */
  public has<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean {
    return array.has(this, predicate);
  }

  /**
   * @summary Checks if value is in array.
   * @description Checks if value is in array.
   * @param array The array to query.
   * @param value The value to search for.
   * @param fromIndex The index to search from.
   * @returns True if value is found, else false.
   * @example
   * ```ts
   * includes([1, 2, 3], 1); // => true
   * ```
   * @example
   * ```ts
   * includes([1, 2, 3], 4); // => false
   * ```
   * @example
   * ```ts
   * includes(['a', 'b', 'c'], 'c', 1); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public includes<T>(this: T[], value: T, fromIndex?: number): boolean {
    return array.includes(this, value, fromIndex);
  }

  /**
   * @summary Inserts an item into an array at the specified index by mutating the array.
   * @description Inserts an item into an array at the specified index by mutating the array.
   * @param array The array to mutate.
   * @param index The index at which to insert the item.
   * @param item The item to insert.
   * @returns The mutated array.
   * @example
   * ```ts
   * insertMut([1, 3], 1, 2); // => [1, 2, 3]
   * ```
   * @example
   * ```ts
   * insertMut(['a', 'c'], 1, 'b'); // => ['a', 'b', 'c']
   * ```
   * @example
   * ```ts
   * insertMut([{ id: 1 }], 1, { id: 2 }); // => [{ id: 1 }, { id: 2 }]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public insertMut<T>(this: T[], index: number, item: T): T[] {
    return array.insertMut(this, index, item);
  }

  /**
   * @summary Create an array of unique values that are included in both given arrays.
   * @description Create an array of unique values that are included in both given arrays.
   * @param source The array to inspect.
   * @param target The values to include.
   * @returns The new array of intersecting values.
   * @example
   * ```ts
   * intersection([1, 2], [2, 3]); // => [2]
   * ```
   * @example
   * ```ts
   * intersection(['a', 'b'], ['a', 'c']); // => ['a']
   * ```
   * @example
   * ```ts
   * intersection([1, 2], [3, 4]); // => []
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public intersection<T>(this: T[], target: T[]): T[] {
    return array.intersection(this, target);
  }

  /**
   * @summary Checks if two arrays are strictly equal.
   * @description Compares two arrays for shallow equality. It returns true if both arrays have the exact same length and every element in the first array is strictly equal (`===`) to the element at the corresponding index in the second array.
   * @param arr1 The first array to compare.
   * @param arr2 The second array to compare.
   * @returns True if the arrays are strictly equal, otherwise false.
   * @example
   * ```ts
   * isArrayEqual([1, 2, 3], [1, 2, 3]);
   * // => true
   * ```
   * @example
   * ```ts
   * isArrayEqual(['a', 'b'], ['a', 'c']);
   * // => false
   * ```
   * @example
   * ```ts
   * isArrayEqual([1, 2], [1, 2, 3]);
   * // => false
   * ```
   * @complexity time O(n)
   * @complexity memory O(1)
   */
  public isArrayEqual<T>(this: T[], arr2: T[]): boolean {
    return array.isArrayEqual(this, arr2);
  }

  /**
   * @summary Check if array is empty.
   * @description Check if array is empty.
   * @param array The array to check.
   * @returns True if array is empty.
   * @example
   * ```ts
   * isEmpty([]); // => true
   * ```
   * @example
   * ```ts
   * isEmpty([1]); // => false
   * ```
   * @example
   * ```ts
   * isEmpty(['a', 'b']); // => false
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public isEmpty<T>(this: ReadonlyArray<T>): boolean {
    return array.isEmpty(this);
  }

  /**
   * @summary Converts an array of objects into a dictionary keyed by a specified property.
   * @description Iterates over an array of objects and creates a dictionary (Record) where the keys are the values of the specified property from each object, and the values are the objects themselves. Note that if multiple objects share the same key, the last one in the array will overwrite the previous ones.
   * @param arr The array of objects to convert.
   * @param get The property name of the objects to use as the dictionary keys.
   * @returns A dictionary mapping the specified key values to the original array elements.
   * @example
   * ```ts
   * const users = [
   *   { id: 1, name: 'Alice' },
   *   { id: 2, name: 'Bob' }
   * ];
   * mapToDictBy(users, (i)=>i.id);
   * // => { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
   * ```
   * @example
   * ```ts
   * const roles = [
   *   { code: 'ADMIN', level: 1 },
   *   { code: 'USER', level: 2 }
   * ];
   * mapToDictBy(roles, (i)=>i.code);
   * // => { 'ADMIN': { code: 'ADMIN', level: 1 }, 'USER': { code: 'USER', level: 2 } }
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public mapToDictBy<T, K extends keyof T>(this: T[], get: (i: T) => string): Record<string | number | symbol, T> {
    return array.mapToDictBy(this, get);
  }

  /**
   * @summary Converts an array of objects into a dictionary keyed by a specified property.
   * @description Iterates over an array of objects and creates a dictionary (Record) where the keys are the values of the specified property from each object, and the values are the objects themselves. Note that if multiple objects share the same key, the last one in the array will overwrite the previous ones.
   * @param arr The array of objects to convert.
   * @param key The property name of the objects to use as the dictionary keys.
   * @returns A dictionary mapping the specified key values to the original array elements.
   * @example
   * ```ts
   * const users = [
   *   { id: 1, name: 'Alice' },
   *   { id: 2, name: 'Bob' }
   * ];
   * mapToDict(users, 'id');
   * // => { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
   * ```
   * @example
   * ```ts
   * const roles = [
   *   { code: 'ADMIN', level: 1 },
   *   { code: 'USER', level: 2 }
   * ];
   * mapToDict(roles, 'code');
   * // => { 'ADMIN': { code: 'ADMIN', level: 1 }, 'USER': { code: 'USER', level: 2 } }
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public mapToDict<T, K extends keyof T>(this: T[], key: K): Record<string | number | symbol, T> {
    return array.mapToDict(this, key);
  }

  /**
   * @summary Creates a new array populated with the results of calling a provided function on every element in the input array.
   * @description Creates a new array populated with the results of calling a provided function on every element in the input array.
   * @param array The array to iterate over.
   * @param iteratee The function invoked per iteration.
   * @returns A new array with the transformed elements.
   * @example
   * ```ts
   * map([1, 2, 3], (n) => n * 2); // => [2, 4, 6]
   * ```
   * @example
   * ```ts
   * map([1, 2, 3], String); // => ['1', '2', '3']
   * ```
   * @example
   * ```ts
   * map(['a', 'b'], (char, index) => char + index); // => ['a0', 'b1']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public map<T, U>(this: T[], iteratee: (element: T, index: number, array: T[]) => U): U[] {
    return array.map(this, iteratee);
  }

  /**
   * @summary Executes a reducer function on each element of the array, resulting in a single output value.
   * @description Executes a reducer function on each element of the array, resulting in a single output value.
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
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public reduce<T, A>(this: T[], reducer: (accumulator: A, value: T, index: number, array: T[]) => A, initialValue: A): A {
    return array.reduce(this, reducer, initialValue);
  }

  /**
   * @summary Removes the specified values from the array.
   * @description It iterates through the provided values and removes the first matching instance in the target array for each.
   * @param array The array to modify.
   * @param values The values to remove from the array.
   * @returns void
   * @example
   * ```ts
   * const array = [1, 2, 3, 4];
   * removeAllMut(array, [1, 3]);
   * array; // => [2, 4]
   * ```
   * @example
   * ```ts
   * const array = ['a', 'b', 'b', 'c'];
   * removeAllMut(array, ['b', 'b']);
   * array; // => ['a', 'c']
   * ```
   * @example
   * ```ts
   * const array = [1, 1, 2];
   * removeAllMut(array, [1]);
   * array; // => [1, 2]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public removeAllMut<T>(this: T[], values: T[]): void {
    return array.removeAllMut(this, values);
  }

  /**
   * @summary Remove an element at a specific index from an array in place.
   * @description Remove an element at a specific index from an array in place.
   * @param arr The mutable array.
   * @param index The zero-based index of the element to remove.
   * @returns The removed element.
   * @example
   * ```ts
   * const items = ['a', 'b', 'c'];
   * removeAtMut(items, 1); // => 'b'
   * ```
   * @example
   * ```ts
   * const numbers = [10, 20, 30];
   * removeAtMut(numbers, -1); // => 30
   * ```
   * @example
   * ```ts
   * const empty = [];
   * removeAtMut(empty, 0); // => undefined
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public removeAtMut<T>(this: T[], index: number): T | undefined {
    return array.removeAtMut(this, index);
  }

  /**
   * @summary Remove the first occurrence of a value from an array in place.
   * @description Mutates the given array by removing the first element that matches the provided value using strict equality. If the value is not found, the array remains unchanged.
   * @param array The array to mutate.
   * @param value The value to remove.
   * @returns void
   * @example
   * ```ts
   * const array = [1, 2, 3, 2];
   * removeFirstMut(array, 2);
   * array; // => [1, 3, 2]
   * ```
   * @example
   * ```ts
   * const array = ['a', 'b', 'c'];
   * removeFirstMut(array, 'a');
   * array; // => ['b', 'c']
   * ```
   * @example
   * ```ts
   * const array = [1, 2, 3];
   * removeFirstMut(array, 99);
   * array; // => [1, 2, 3]
   * ```
   * @complexity time O(n)
   * @complexity memory O(1)
   */
  public removeFirstMut<T>(this: T[], value: T): void {
    return array.removeFirstMut(this, value);
  }

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
  public removeLastMut<T>(this: Array<T>, deltaIndex?: number): T[] {
    return array.removeLastMut(this, deltaIndex);
  }

  /**
   * @summary Remove elements from the end of an array.
   * @description Returns a new array with the last element(s) removed. An optional `deltaIndex` adjusts how many elements are kept relative to removing just the last one.
   * @param arr The source array.
   * @param deltaIndex Offset applied to the slice end. Defaults to `0` (remove last element). Negative values remove additional elements.
   * @returns A new array with the trailing element(s) removed.
   * @example
   * ```ts
   * removeLast([1, 2, 3]); // => [1, 2]
   * ```
   * @example
   * ```ts
   * removeLast([1, 2, 3], -1); // => [1]
   * ```
   * @example
   * ```ts
   * removeLast(['a', 'b', 'c', 'd'], 0); // => ['a', 'b', 'c']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public removeLast<T>(this: Array<T>, deltaIndex?: number): T[] {
    return array.removeLast(this, deltaIndex);
  }

  public removeMut<T>(this: T[], item: T): T | undefined {
    return array.removeMut(this, item);
  }

  /**
   * @summary Reverses an array in place.
   * @description Reverses an array in place.
   * @param array The array to reverse.
   * @returns The reversed array.
   * @example
   * ```ts
   * const array = [1, 2, 3];
   * reverseMut(array);
   * array; // => [3, 2, 1]
   * ```
   * @example
   * ```ts
   * const array = ['a', 'b'];
   * reverseMut(array);
   * array; // => ['b', 'a']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public reverseMut<T>(this: T[]): T[] {
    return array.reverseMut(this);
  }

  /**
   * @summary Creates a new array with the elements in reverse order.
   * @description Creates a new array with the elements in reverse order.
   * @param array The input array.
   * @returns A new reversed array.
   * @example
   * ```ts
   * reverse([1, 2, 3]); // => [3, 2, 1]
   * ```
   * @example
   * ```ts
   * reverse(['y', 'z']); // => ['z', 'y']
   * ```
   * @example
   * ```ts
   * reverse([]); // => []
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public reverse<T>(this: T[]): T[] {
    return array.reverse(this);
  }

  /**
   * @summary Sets the value of the last element of an array mutably, with an optional offset.
   * @description Sets the value of the last element of an array mutably, with an optional offset.
   * @param array The array to mutate.
   * @param value The value to assign.
   * @param offset The offset from the last index.
   * @returns The mutated array.
   * @example
   * ```ts
   * setLastMut([1, 2, 3], 4); // => [1, 2, 4]
   * ```
   * @example
   * ```ts
   * setLastMut(['a', 'b'], 'c'); // => ['a', 'c']
   * ```
   * @example
   * ```ts
   * setLastMut([1, 2, 3], 5, -1); // => [1, 5, 3]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public setLastMut<T>(this: T[], value: T, offset?: number): T[] {
    return array.setLastMut(this, value, offset);
  }

  /**
   * @summary Creates a new array with the element at the specified index replaced with the given value.
   * @description Creates a new array with the element at the specified index replaced with the given value.
   * @param array The source array.
   * @param index The zero-based index at which to replace the value, converted to an integer. Negative index counts from the end of the array.
   * @param value The value to insert into the new array.
   * @returns A new array with the element at the index replaced.
   * @throws {RangeError} Throws if the index is out of bounds (index < -array.length or index >= array.length).
   * @example
   * ```ts
   * set(['a', 'b', 'c'], 1, 'x'); // => ['a', 'x', 'c']
   * ```
   * @example
   * ```ts
   * set([1, 2, 3], -1, 99);
   * // => [1, 2, 99]
   * ```
   * @example
   * ```ts
   * set([0, 1, 0], 1, 0); // => [0, 0, 0]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public set<T>(this: Array<T>, index: number, value: T): T[] {
    return array.set(this, index, value);
  }

  /**
   * @summary Checks if at least one element in the array satisfies the provided testing function.
   * @description Checks if at least one element in the array satisfies the provided testing function.
   * @param array The array to iterate over.
   * @param predicate The function invoked per iteration.
   * @returns True if any element passes the predicate check, false otherwise.
   * @example
   * ```ts
   * some([1, 2, 3, 4], (n) => n % 2 === 0);// => true
   * ```
   * @example
   * ```ts
   * some([1, 3, 5, 7], (n) => n % 2 === 0);// => false
   * ```
   * @example
   * ```ts
   * some(['a', 'bc', 'd'], (s) => s.length > 1);// => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public some<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean {
    return array.some(this, predicate);
  }

  /**
   * @summary Sort an array in place based on the order defined by another array.
   * @description Mutably sorts `oldOrder` so that its elements appear in the same
   * relative order as they do in `newOrder`. Elements not found in `newOrder` are
   * pushed to the end in their original relative order (via `Infinity` fallback).
   * @param oldOrder The array to sort in place.
   * @param newOrder The array defining the desired order.
   * @returns The mutated `oldOrder` array, sorted according to `newOrder`.
   * @example
   * ```ts
   * sortByArrayMut(['c', 'b', 'a'], ['a', 'b', 'c']); // => ['a', 'b', 'c']
   * ```
   * @example
   * ```ts
   * sortByArrayMut(['x', 'y', 'z'], ['z', 'x', 'y']); // => ['z', 'x', 'y']
   * ```
   * @example
   * ```ts
   * sortByArrayMut(['d', 'a', 'b'], ['b', 'a']); // => ['b', 'a', 'd']
   * ```
   * @complexity time O(m + n log n) where m = newOrder.length, n = oldOrder.length
   * @complexity memory O(m)
   */
  public sortByArrayMut<T>(this: T[], newOrder: T[]): T[] {
    return array.sortByArrayMut(this, newOrder);
  }

  /**
   * @summary Creates an array of unique values from the input array, sorted by their frequency of occurrence in descending order.
   * @description Creates an array of unique values from the input array, sorted by their frequency of occurrence in descending order.
   * @param array The array to process.
   * @returns The new array of unique, sorted values.
   * @example
   * ```ts
   * sortByFrequencyAndUnique([1, 2, 2, 2, 1]); // => [2, 1]
   * ```
   * @example
   * ```ts
   * sortByFrequencyAndUnique(['a', 'a', 'a', 'b', 'b', 'c']); // => ['a', 'b', 'c']
   * ```
   * @example
   * ```ts
   * sortByFrequencyAndUnique([10, 20, 10, 10, 20]); // => [10, 20]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public sortByFrequencyAndUnique<T>(this: T[]): T[] {
    return array.sortByFrequencyAndUnique(this);
  }

  /**
   * @summary This function performs a stable sort and does not mutate the original array.
   * @description Creates a new array of elements sorted in ascending order by the results of running an iteratee on each element.
   * @param array The array to sort.
   * @param {(item: T) => string | number} iteratee The function invoked per iteration to generate the sorting criteria.
   * @returns Returns the new sorted array.
   * @example
   * ```ts
   * sortBy([3, 1, 2], (n) => n); // => [1, 2, 3]
   * ```
   * @example
   * ```ts
   * sortBy(['bb', 'ccc', 'a'], (s) => s.length); // => ['a', 'bb', 'ccc']
   * ```
   * @example
   * ```ts
   * sortBy([{ user: 'fred', age: 40 }, { user: 'barney', age: 36 }], (u) => u.age);
   * // => [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public sortBy<T>(this: T[], iteratee?: (item: T) => string | number): T[] {
    return array.sortBy(this, iteratee);
  }

  /**
   * @summary Creates a slice of array with n elements taken from the beginning.
   * @description Creates a slice of array with n elements taken from the beginning.
   * @param array The array to query.
   * @param n The number of elements to take.
   * @returns The slice of array.
   * @example
   * ```ts
   * take([1, 2, 3], 1); // => [1]
   * ```
   * @example
   * ```ts
   * take([1, 2, 3], 2); // => [1, 2]
   * ```
   * @example
   * ```ts
   * take([1, 2, 3], 5); // => [1, 2, 3]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public take<T>(this: T[], n: number): T[] {
    return array.take(this, n);
  }

  /**
   * @summary Toggles the presence of an item in an array.
   * @description If the item exists, it is removed. Otherwise, it is appended.
   * @param array The source array.
   * @param item The item to toggle.
   * @returns A new array with the item toggled.
   * @example
   * ```ts
   * toggle([1, 2], 3); // => [1, 2, 3]
   * ```
   * @example
   * ```ts
   * toggle(['a', 'b', 'c'], 'b'); // => ['a', 'c']
   * ```
   * @example
   * ```ts
   * toggle([], true); // => [true]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public toggle<T>(this: T[], item: T): T[] {
    return array.toggle(this, item);
  }

  /**
   * @summary Returns the index of the first element in the array that satisfies the provided testing function.
   * @description Returns the index of the first element in the array that satisfies the provided testing function.
   * @template T
   * @param array The array to search.
   * @param predicate The function to execute on each value.
   * @returns The index of the first element that passes the test, otherwise return null.
   * @example
   * ```ts
   * tryFindIndex([1, 2, 3], (x) => x === 2); // => 1
   * ```
   * @example
   * ```ts
   * tryFindIndex(['a', 'b', 'c'], (x) => x !== 'b'); // => 0
   * ```
   * @example
   * ```ts
   * tryFindIndex([1, 2, 3], (x) => x > 5); // => -1
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public tryFindIndex<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): number | null {
    return array.tryFindIndex(this, predicate);
  }

  /**
   * @summary Find an item in an array that matches the predicate.
   * @description Find an item in an array that matches the predicate. Returns null if no item is found.
   * @template T
   * @param array The array to search.
   * @param predicate The function invoked per iteration.
   * @returns The found item, or null if not found.
   * @example
   * ```ts
   * tryFind([1, 2, 3], (n) => n === 2); // => 2
   * ```
   * @example
   * ```ts
   * tryFind([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => { id: 1 }
   * ```
   * @example
   * ```ts
   * tryFind([1, 2, 3], (n) => n === 4); // => null
   * ```
   * @complexity time O(n)
   * @complexity memory O(1)
   */
  public tryFind<T>(this: T[], predicate: (item: T, index: number, array: T[]) => boolean): T | null {
    return array.tryFind(this, predicate);
  }

  /**
   * @summary Find the first element in array2 that also exists in array1.
   * @description Iterates through array2 and for each element checks if it exists in array1 using strict equality. Returns the first matching element, or null if no match is found.
   * @param array1 The reference array to match against.
   * @param array2 The array to search through in order.
   * @returns The first element from array2 found in array1, or null if none match.
   * @example
   * ```ts
   * tryFirstEqual([1, 2, 3], [4, 2, 3]); // => 2
   * ```
   * @example
   * ```ts
   * tryFirstEqual(['a', 'b'], ['c', 'd']); // => null
   * ```
   * @example
   * ```ts
   * tryFirstEqual([10, 20, 30], [30, 20, 10]); // => 30
   * ```
   * @complexity time O(n * m)
   * @complexity memory O(1)
   */
  public tryFirstEqual<T>(this: T[], array2: T[]): T | null {
    return array.tryFirstEqual(this, array2);
  }

  /**
   * @summary Returns the last pair of elements from two arrays that satisfy the provided predicate.
   * @description Iterates through both arrays in reverse order.
   * @param arrayA The first array.
   * @param arrayB The second array.
   * @param predicate The comparison function to determine equality or condition match.
   * @returns A tuple containing the matched elements from both arrays, or null if no match is found.
   * @example
   * ```ts
   * tryLastEqual([1, 2, 3], [3, 4, 5], (a, b) => a === b);
   * // => [3, 3]
   * ```
   * @example
   * ```ts
   * tryLastEqual(['a', 'b'], ['A', 'B'], (a, b) => a.toUpperCase() === b);
   * // => ['b', 'B']
   * ```
   * @example
   * ```ts
   * tryLastEqual([1, 2], [3, 4], (a, b) => a === b);
   * // => null
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public tryGetLastEqual<T, U>(this: T[], arrayB: U[], predicate: (itemA: T, itemB: U) => boolean): [T, U] | null {
    return array.tryGetLastEqual(this, arrayB, predicate);
  }

  /**
   * @summary Retrieves the last element of an array or an element relative to the end.
   * @description Returns null if the index is out of bounds.
   * @param arr The input array.
   * @param deltaIndex The offset from the end (defaults to 0).
   * @returns {T | null} The element or null.
   * @example
   * ```ts
   * tryGetLast(['a', 'b', 'c']); // => 'c'
   * ```
   * @example
   * ```ts
   * tryGetLast(['a', 'b', 'c'], -1); // => 'b'
   * ```
   * @example
   * ```ts
   * tryGetLast([]); // => null
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public tryGetLast<T>(this: T[], deltaIndex?: number): T | null {
    return array.tryGetLast(this, deltaIndex);
  }

  /**
   * @summary Create an array of unique values, in order, from all given arrays.
   * @description Create an array of unique values, in order, from all given arrays.
   * @param {Array<Array<T>>} arrays The arrays to inspect.
   * @returns {Array<T>} The new array of combined values.
   * @example
   * ```ts
   * union([2], [1, 2]); // => [2, 1]
   * ```
   * @example
   * ```ts
   * union(['a'], ['b'], ['a']); // => ['a', 'b']
   * ```
   * @example
   * ```ts
   * union([1, 2], [2, 3]); // => [1, 2, 3]
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public union<T>(this: T[][]): T[] {
    return array.union(...this);
  }

  /**
   * @summary Creates a duplicate-free version of an array, using an iteratee to determine uniqueness.
   * @description Creates a duplicate-free version of an array, keeping only the first occurrence of each element based on the value returned by the iteratee.
   * @param array The array to inspect.
   * @param iteratee The function invoked per element to generate the criterion by which uniqueness is computed.
   * @returns The new duplicate-free array.
   * @example
   * ```ts
   * uniqBy([2.1, 1.2, 2.3], Math.floor); // => [2.1, 1.2]
   * ```
   * @example
   * ```ts
   * uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (x) => x.id); // => [{ id: 1 }, { id: 2 }]
   * ```
   * @example
   * ```ts
   * uniqBy(['a', 'A', 'b'], (x) => x.toLowerCase()); // => ['a', 'b']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public uniqBy<T, U>(this: ReadonlyArray<T>, iteratee: (value: T) => U): T[] {
    return array.uniqBy(this, iteratee);
  }

  /**
   * @summary Creates a duplicate-free version of an array.
   * @description Creates a duplicate-free version of an array.
   * @param array The array to inspect.
   * @returns The new duplicate-free array.
   * @example
   * ```ts
   * uniq([1, 2, 1]); // => [1, 2]
   * ```
   * @example
   * ```ts
   * uniq(['a', 'b', 'a']); // => ['a', 'b']
   * ```
   * @example
   * ```ts
   * uniq([1, '1', 1]); // => [1, '1']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public uniq<T>(this: ReadonlyArray<T>): T[] {
    return array.uniq(this);
  }

  /**
   * @summary Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
   * @description Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
   * @param arrays The arrays to process.
   * @returns The new array of grouped elements.
   * @example
   * ```ts
   * zip(['a', 'b'], [1, 2]); // => [['a', 1], ['b', 2]]
   * ```
   * @example
   * ```ts
   * zip(['a', 'b'], [1]); // => [['a', 1]]
   * ```
   * @example
   * ```ts
   * zip([], [1, 2]); // => []
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public zip<T>(this: T[][]): T[][] {
    return array.zip(...this);
  }

}
