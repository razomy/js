# @razomy/array

[![License](https://img.shields.io/npm/l/@razomy/array)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/array)](https://bundlephobia.com/package/@razomy/array)
[![TypeScript](https://img.shields.io/npm/types/@razomy/array)](https://www.npmjs.com/package/@razomy/array)
[![Node.js Version](https://img.shields.io/node/v/@razomy/array)](https://www.npmjs.com/package/@razomy/array)
[![npm version](https://img.shields.io/npm/v/@razomy/array)](https://www.npmjs.com/package/@razomy/array)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/array)](https://www.npmjs.com/package/@razomy/array)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/array) |
[Npmx](https://npmx.dev/package/@razomy/array) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/array) |
[Io](https://io.razomy.org/array)

>

## 🚀 Start

### Install

```sh
npm i @razomy/array
```

### Import

```ts
import * as array from '@razomy/array';
// or
import { addMut } from '@razomy/array';
```

## 📑 Table of Contents

**Functions**

- [addMut](#addmut)
- [chunk](#chunk)
- [countBy](#countby)
- [create](#create)
- [createByIndexAndSize](#createbyindexandsize)
- [difference](#difference)
- [drop](#drop)
- [every](#every)
- [filter](#filter)
- [find](#find)
- [findIndex](#findindex)
- [flat](#flat)
- [getFirst](#getfirst)
- [getLast](#getlast)
- [groupBy](#groupby)
- [hasSub](#hassub)
- [includes](#includes)
- [insertMut](#insertmut)
- [intersection](#intersection)
- [isArray](#isarray)
- [isEmpty](#isempty)
- [map](#map)
- [reduce](#reduce)
- [removeAllMut](#removeallmut)
- [removeAtMut](#removeatmut)
- [removeFirstMut](#removefirstmut)
- [removeLast](#removelast)
- [reverse](#reverse)
- [reverseMut](#reversemut)
- [set](#set)
- [setLastMut](#setlastmut)
- [some](#some)
- [sortBy](#sortby)
- [sortByArrayMut](#sortbyarraymut)
- [sortByFrequencyAndUnique](#sortbyfrequencyandunique)
- [take](#take)
- [toggle](#toggle)
- [tryFirstEqual](#tryfirstequal)
- [tryGetLast](#trygetlast)
- [tryGetLastEqual](#trygetlastequal)
- [union](#union)
- [uniq](#uniq)
- [zip](#zip)

## 📚 Documentation

### Functions

#### addMut

`addMut(array: T[], value: T): T[]`

Add an element to the end of an array, modifying the original array.

Examples

```ts
const list = [1, 2];
addMut(list, 3); // [1, 2, 3]
```

```ts
addMut(['a'], 'b'); // [a, b]
```

```ts
const refs = [{ id: 1 }];
addMut(refs, { id: 2 }); // [{ id: 1 }, { id: 2 }]
```

#### chunk

`chunk(array: T[], size: number): T[][]`

Splits an array into smaller arrays (chunks) of a specified size.

The last chunk may be smaller than the `size`.

Examples

```ts
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

```ts
chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3); // [[a, b, c], [d, e, f]]
```

```ts
chunk([true, false], 5); // [[true, false]]
```

#### countBy

`countBy(array: readonly T[], predicate: (value: T) => PropertyKey): Record<string, number>`

Count occurrences of elements grouped by a predicate.

Groups array elements by the result of a predicate function and counts occurrences of each group key.

Examples

```ts
countBy([6.1, 4.2, 6.3], Math.floor); // { 4: 1, 6: 2 }
```

```ts
countBy(['one', 'two', 'three'], (v) => v.length); // { 3: 2, 5: 1 }
```

```ts
countBy([true, false, true, true], (v) => v); // { true: 3, false: 1 }
```

#### create

`create(size: number, value: T): T[]`

Create an array of specific size filled with a value.

Examples

```ts
create(3, 0); // [0, 0, 0]
```

```ts
create(2, 'x'); // [x, x]
```

```ts
create(4, true); // [true, true, true, true]
```

#### createByIndexAndSize

`createByIndexAndSize(index: number, size: number): number[]`

Create an array of a specific size with the value 1 at the specified index.

Examples

```ts
createByIndexAndSize(0, 2); // [1, undefined]
```

```ts
createByIndexAndSize(1, 3); // [undefined, 1, undefined]
```

```ts
createByIndexAndSize(3, 4); // [undefined, undefined, undefined, 1]
```

#### difference

`difference(source: T[], other: T[]): T[]`

Computes the difference between two arrays.

Returns a new array with elements that are in the first array but not in the second array.
The order of elements in the result is determined by the order in the first array.

Examples

```ts
difference([1, 2, 3], [2, 4]); // [1, 3]
```

```ts
difference(['apple', 'banana', 'orange'], ['orange', 'grape']); // [apple, banana]
```

```ts
difference([1, 2, 3, 4, 5], [2, 3, 4]); // [1, 5]
```

#### drop

`drop(array: T[], count: number): T[]`

Creates a slice of array with n elements dropped from the beginning.

Examples

```ts
drop([1, 2, 3], 1); // [2, 3]
```

```ts
drop([1, 2, 3], 2); // [3]
```

```ts
drop([1, 2, 3], 5); // []
```

#### every

`every(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean`

Checks if all elements in the array satisfy the provided testing function.

Examples

```ts
every([2, 4, 6], (n) => n % 2 === 0); // true
```

```ts
every([2, 4, 7], (n) => n % 2 === 0); // false
```

```ts
every([], (n) => n > 5); // true
```

#### filter

`filter(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T[]`

Creates a new array with all elements that pass the test implemented by the provided function.

Examples

```ts
filter([1, 2, 3, 4], (n) => n % 2 === 0); // [2, 4]
```

```ts
filter([{ id: 1 }, { id: 2 }], (item) => item.id === 1); // [{ id: 1 }]
```

```ts
filter(['a', 'b', 'c'], (_, index) => index !== 1); // [a, c]
```

#### find

`find(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T`

Find an item in an array that matches the predicate.
Throws an error if no item is found.

Examples

```ts
find([1, 2, 3], (n) => n === 2); // 2
```

```ts
find([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // { id: 1 }
```

```ts
find([1, 2, 3], (n) => n === 4); // Error: Item not found.
```

#### findIndex

`findIndex(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): number`

Returns the index of the first element in the array that satisfies the provided testing function.

Examples

```ts
findIndex([1, 2, 3], (x) => x === 2); // 1
```

```ts
findIndex(['a', 'b', 'c'], (x) => x !== 'b'); // 0
```

```ts
findIndex([1, 2, 3], (x) => x > 5); // -1
```

#### flat

`flat(array: readonly (T | readonly T[])[]): T[]`

Flattens an array of nested arrays by one level.

Examples

```ts
flat([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]
```

```ts
flat([1, 2, [3, [4]]]); // [1, 2, 3, [4]]
```

```ts
flat([['a'], 'b']); // [a, b]
```

#### getFirst

`getFirst(array: T[]): T`

Get the first element of an array.

Examples

```ts
getFirst([1, 2, 3]); // 1
```

```ts
getFirst(['a', 'b', 'c']); // a
```

```ts
getFirst([]); // Error: Array is empty
```

#### getLast

`getLast(array: T[], offset: number): T`

Retrieves the last element of an array.

Optionally accepts an offset to retrieve preceding elements.
Throws an error if the element is not found (e.g., empty array or out of bounds).

Examples

```ts
getLast([1, 2, 3]); // 3
```

```ts
getLast(['a', 'b', 'c'], 1); // b
```

```ts
getLast([1, 2, 3], 10); // Error: Element at offset 10 does not exist.
```

#### groupBy

`groupBy(array: T[], iteratee: (item: T) => K): Record<K, T[]>`

Groups the elements of an array according to the result of the iteratee function.

Examples

```ts
groupBy([6.1, 4.2, 6.3], Math.floor); // { 4: [4.2], 6: [6.1, 6.3] }
```

```ts
groupBy(['one', 'two', 'three'], (s) => s.length); // { 3: [one, two], 5: [three] }
```

```ts
groupBy(
  [
    { k: 'a', v: 1 },
    { k: 'b', v: 2 },
  ],
  (o) => o.k,
); // { a: [{ k: a, v: 1 }], b: [{ k: b, v: 2 }] }
```

#### hasSub

`hasSub(master: T[], sub: T[]): boolean`

Check if the master array contains all elements of the sub array in the same relative order.

Examples

```ts
subHas([1, 2, 3, 4], [2, 4]); // true
```

```ts
subHas(['a', 'b', 'c'], ['c', 'a']); // false
```

```ts
subHas([true, false], []); // true
```

#### includes

`includes(array: T[], value: T, fromIndex: number | undefined): boolean`

Checks if value is in array.

Examples

```ts
includes([1, 2, 3], 1); // true
```

```ts
includes([1, 2, 3], 4); // false
```

```ts
includes(['a', 'b', 'c'], 'c', 1); // true
```

#### insertMut

`insertMut(array: T[], index: number, item: T): T[]`

Inserts an item into an array at the specified index by mutating the array.

Examples

```ts
insertMut([1, 3], 1, 2); // [1, 2, 3]
```

```ts
insertMut(['a', 'c'], 1, 'b'); // [a, b, c]
```

```ts
insertMut([{ id: 1 }], 1, { id: 2 }); // [{ id: 1 }, { id: 2 }]
```

#### intersection

`intersection(source: T[], target: T[]): T[]`

Create an array of unique values that are included in both given arrays.

Examples

```ts
intersection([1, 2], [2, 3]); // [2]
```

```ts
intersection(['a', 'b'], ['a', 'c']); // [a]
```

```ts
intersection([1, 2], [3, 4]); // []
```

#### isArray

`isArray(value: unknown): boolean`

Check if a value is an array.

Determines whether the provided value is an array using `Array.isArray`.

Examples

```ts
isArray([1, 2, 3]); // true
```

```ts
isArray('hello'); // false
```

```ts
isArray([]); // true
```

#### isEmpty

`isEmpty(array: readonly T[]): boolean`

Check if array is empty.

Examples

```ts
isEmpty([]); // true
```

```ts
isEmpty([1]); // false
```

```ts
isEmpty(['a', 'b']); // false
```

#### map

`map(array: T[], iteratee: (element: T, index: number, array: T[]) => U): U[]`

Creates a new array populated with the results of calling a provided function on every element in the input array.

Examples

```ts
map([1, 2, 3], (n) => n * 2); // [2, 4, 6]
```

```ts
map([1, 2, 3], String); // [1, 2, 3]
```

```ts
map(['a', 'b'], (char, index) => char + index); // [a0, b1]
```

#### reduce

`reduce(array: T[], reducer: (accumulator: A, value: T, index: number, array: T[]) => A, initialValue: A): A`

Executes a reducer function on each element of the array, resulting in a single output value.

Examples

```ts
reduce([1, 2, 3, 4], (acc, val) => acc + val, 0); // 10
```

```ts
reduce(
  [
    ['a', 1],
    ['b', 2],
  ],
  (acc, [key, val]) => ({ ...acc, [key]: val }),
  {},
); // { a: 1, b: 2 }
```

```ts
reduce(
  [1, 2, 3],
  (acc, val) => {
    acc.push(val * 2);
    return acc;
  },
  [],
); // [2, 4, 6]
```

#### removeAllMut

`removeAllMut(): void`

Examples

#### removeAtMut

`removeAtMut(array: T[], index: number): T | undefined`

Remove an element at a specific index from an array in place.

Examples

```ts
const items = ['a', 'b', 'c'];
removeAtMut(items, 1); // b
```

```ts
const numbers = [10, 20, 30];
removeAtMut(numbers, -1); // 30
```

```ts
const empty = [];
removeAtMut(empty, 0); // undefined
```

#### removeFirstMut

`removeFirstMut(arr: T[], value: T): void`

Remove the first occurrence of a value from an array in place.

Mutates the given array by removing the first element that matches the provided value using strict equality. If the value is not found, the array remains unchanged.

Examples

#### removeLast

`removeLast(arr: readonly T[], deltaIndex: number): T[]`

Remove elements from the end of an array.

Returns a new array with the last element(s) removed. An optional `deltaIndex` adjusts how many elements are kept relative to removing just the last one.

Examples

```ts
removeLast([1, 2, 3]); // [1, 2]
```

```ts
removeLast([1, 2, 3], -1); // [1]
```

```ts
removeLast(['a', 'b', 'c', 'd'], 0); // [a, b, c]
```

#### reverse

`reverse(array: T[]): T[]`

Creates a new array with the elements in reverse order.

Examples

```ts
reverse([1, 2, 3]); // [3, 2, 1]
```

```ts
reverse(['y', 'z']); // [z, y]
```

```ts
reverse([]); // []
```

#### reverseMut

`reverseMut(array: T[]): T[]`

Reverses an array in place.

Examples

```ts
const array = [1, 2, 3];
reverseMut(array);
array; // [3, 2, 1]
```

```ts
const array = ['a', 'b'];
reverseMut(array);
array; // [b, a]
```

#### set

`set(array: readonly T[], index: number, value: T): T[]`

Creates a new array with the element at the specified index replaced with the given value.

Examples

```ts
set(['a', 'b', 'c'], 1, 'x'); // [a, x, c]
```

```ts
set([1, 2, 3], -1, 99); // [1, 2, 99]
```

```ts
set([0, 1, 0], 1, 0); // [0, 0, 0]
```

#### setLastMut

`setLastMut(array: T[], value: T, offset: number): T[]`

Sets the value of the last element of an array mutably, with an optional offset.

Examples

```ts
setLastMut([1, 2, 3], 4); // [1, 2, 4]
```

```ts
setLastMut(['a', 'b'], 'c'); // [a, c]
```

```ts
setLastMut([1, 2, 3], 5, -1); // [1, 5, 3]
```

#### some

`some(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean`

Checks if at least one element in the array satisfies the provided testing function.

Examples

```ts
some([1, 2, 3, 4], (n) => n % 2 === 0); // true
```

```ts
some([1, 3, 5, 7], (n) => n % 2 === 0); // false
```

```ts
some(['a', 'bc', 'd'], (s) => s.length > 1); // true
```

#### sortBy

`sortBy(array: T[], iteratee: (item: T) => string | number): T[]`

This function performs a stable sort and does not mutate the original array.

Creates a new array of elements sorted in ascending order by the results of running an iteratee on each element.

Examples

```ts
sortBy([3, 1, 2], (n) => n); // [1, 2, 3]
```

```ts
sortBy(['bb', 'ccc', 'a'], (s) => s.length); // [a, bb, ccc]
```

```ts
sortBy(
  [
    { user: 'fred', age: 40 },
    { user: 'barney', age: 36 },
  ],
  (u) => u.age,
); // [{ user: barney, age: 36 }, { user: fred, age: 40 }]
```

#### sortByArrayMut

`sortByArrayMut(oldOrder: T[], newOrder: T[]): T[]`

Sort an array in place based on the order defined by another array.

Mutably sorts `oldOrder` so that its elements appear in the same
relative order as they do in `newOrder`. Elements not found in `newOrder` are
pushed to the end in their original relative order (via `Infinity` fallback).

Examples

```ts
sortByArrayMut(['c', 'b', 'a'], ['a', 'b', 'c']); // [a, b, c]
```

```ts
sortByArrayMut(['x', 'y', 'z'], ['z', 'x', 'y']); // [z, x, y]
```

```ts
sortByArrayMut(['d', 'a', 'b'], ['b', 'a']); // [b, a, d]
```

#### sortByFrequencyAndUnique

`sortByFrequencyAndUnique(array: T[]): T[]`

Creates an array of unique values from the input array, sorted by their frequency of occurrence in descending order.

Examples

```ts
sortByFrequencyAndUnique([1, 2, 2, 2, 1]); // [2, 1]
```

```ts
sortByFrequencyAndUnique(['a', 'a', 'a', 'b', 'b', 'c']); // [a, b, c]
```

```ts
sortByFrequencyAndUnique([10, 20, 10, 10, 20]); // [10, 20]
```

#### take

`take(array: T[], n: number): T[]`

Creates a slice of array with n elements taken from the beginning.

Examples

```ts
take([1, 2, 3], 1); // [1]
```

```ts
take([1, 2, 3], 2); // [1, 2]
```

```ts
take([1, 2, 3], 5); // [1, 2, 3]
```

#### toggle

`toggle(array: T[], item: T): T[]`

Toggles the presence of an item in an array.

If the item exists, it is removed. Otherwise, it is appended.

Examples

```ts
toggle([1, 2], 3); // [1, 2, 3]
```

```ts
toggle(['a', 'b', 'c'], 'b'); // [a, c]
```

```ts
toggle([], true); // [true]
```

#### tryFirstEqual

`tryFirstEqual(list1: T[], list2: T[]): T | null`

Find the first element in list2 that also exists in list1.

Iterates through list2 and for each element checks if it exists in list1 using strict equality. Returns the first matching element, or null if no match is found.

Examples

```ts
tryFirstEqual([1, 2, 3], [4, 2, 3]); // 2
```

```ts
tryFirstEqual(['a', 'b'], ['c', 'd']); // null
```

```ts
tryFirstEqual([10, 20, 30], [30, 20, 10]); // 30
```

#### tryGetLast

`tryGetLast(arr: T[], deltaIndex: number): T | null`

Retrieves the last element of an array or an element relative to the end.

Returns null if the index is out of bounds.

Examples

```ts
tryGetLast(['a', 'b', 'c']); // c
```

```ts
tryGetLast(['a', 'b', 'c'], -1); // b
```

```ts
tryGetLast([]); // null
```

#### tryGetLastEqual

`tryGetLastEqual(arrayA: T[], arrayB: U[], predicate: (itemA: T, itemB: U) => boolean): [T, U] | null`

Returns the last pair of elements from two arrays that satisfy the provided predicate.

Iterates through both arrays in reverse order.

Examples

```ts
tryLastEqual([1, 2, 3], [3, 4, 5], (a, b) => a === b); // [3, 3]
```

```ts
tryLastEqual(['a', 'b'], ['A', 'B'], (a, b) => a.toUpperCase() === b); // [b, B]
```

```ts
tryLastEqual([1, 2], [3, 4], (a, b) => a === b); // null
```

#### union

`union(arrays: T[][]): T[]`

Create an array of unique values, in order, from all given arrays.

Examples

```ts
union([2], [1, 2]); // [2, 1]
```

```ts
union(['a'], ['b'], ['a']); // [a, b]
```

```ts
union([1, 2], [2, 3]); // [1, 2, 3]
```

#### uniq

`uniq(array: readonly T[]): T[]`

Creates a duplicate-free version of an array.

Examples

```ts
uniq([1, 2, 1]); // [1, 2]
```

```ts
uniq(['a', 'b', 'a']); // [a, b]
```

```ts
uniq([1, '1', 1]); // [1, 1]
```

#### zip

`zip(arrays: T[][]): T[][]`

Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.

Examples

```ts
zip(['a', 'b'], [1, 2]); // [[a, 1], [b, 2]]
```

```ts
zip(['a', 'b'], [1]); // [[a, 1]]
```

```ts
zip([], [1, 2]); // []
```

## 🕊️ Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

## 💖 Fuel Our Shared Future

We can't build this without you.
If this library has saved you time or helped turn chaos into clarity in your own projects,
please consider backing the developers behind it.
Building reliable, open-source tools takes immense time and energy.
Your sponsorship isn't just a donation;
it’s the fuel that keeps this project actively maintained, bug-free, and thriving for everyone who relies on it.

Help us keep the momentum going. Choose how you want to light the way:

- [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
- [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
- [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
- [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/razomy/js/issues).

## 📝 License

Copyright © 2026 [Razomy](https://github.com/razomy).
This project is [MIT](https://github.com/razomy/js/blob/main/LICENSE) licensed.

## 🐛 Reporting Issues

We use GitHub Issues as the official bug tracker for this project.

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
