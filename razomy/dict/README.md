# @razomy/dict

[![License](https://img.shields.io/npm/l/@razomy/dict)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/dict)](https://bundlephobia.com/package/@razomy/dict)
[![TypeScript](https://img.shields.io/npm/types/@razomy/dict)](https://www.npmjs.com/package/@razomy/dict)
[![Node.js Version](https://img.shields.io/node/v/@razomy/dict)](https://www.npmjs.com/package/@razomy/dict)
[![npm version](https://img.shields.io/npm/v/@razomy/dict)](https://www.npmjs.com/package/@razomy/dict)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/dict)](https://www.npmjs.com/package/@razomy/dict)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/dict) | 
[Npmx](https://npmx.dev/package/@razomy/dict) | 
[GitHub](https://github.com/razomy/js/tree/main/razomy/dict) | 
[Io](https://io.razomy.org/dict)

> A lightweight, zero-dependency TypeScript library for advanced dict manipulations.

## 🚀 Start
### Install
```sh
npm i @razomy/dict
```

### Import
```ts
import * as dict from "@razomy/dict";
// or
import { filter } from "@razomy/dict";
```

## 📑 Table of Contents
**Functions**
- [filter](#filter)
- [firstKey](#firstkey)
- [get](#get)
- [getKeys](#getkeys)
- [isKeys](#iskeys)
- [isPlainObject](#isplainobject)
- [iterate](#iterate)
- [map](#map)
- [mapToArray](#maptoarray)
- [merge](#merge)
- [take](#take)
- [toString_](#tostring_)

## 📚 Documentation
### Functions
#### filter

`filter(dict: Dict<T>, predicate: (value: T, key: string) => boolean): import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict/dict").Dict<T>`

Filter entries of a dictionary by a predicate.

Returns a new dictionary containing only the entries for which the predicate returns true.

Examples
```ts
filter<number>({ a: 1, b: 2, c: 3 }, (v) => v > 1); // { b: 2, c: 3 }
```

```ts
filter<string>({ x: 'foo', y: 'bar' }, (_, k) => k === 'x'); // { x: foo }
```

```ts
filter<number>({ a: 10, b: 20 }, () => false); // {}
```



#### firstKey

`firstKey(): string`




Examples




#### get

`get(dict: T, attr: keyof T): T[keyof T] | undefined`

Retrieves the value associated with a specific key from a dictionary.

Returns the value assigned to the provided key in the dictionary. If the key does not exist, returns undefined.

Examples
```ts
get({ a: 1 }, 'a'); // 1
```

```ts
get({ b: 'hello' }, 'b'); // hello
```

```ts
get({ c: null }, 'c'); // null
```



#### getKeys

`getKeys(object: T): (keyof T)[]`

Retrieves the own enumerable string-keyed property names of an object.

Returns an array of the object's own enumerable property names.

Examples
```ts
getKeys({ a: 1, b: 2 }); // [a, b]
```

```ts
getKeys({}); // []
```

```ts
getKeys({ name: 'Raz', id: 101 }); // [name, id]
```



#### isKeys

`isKeys(dict: Dict<T>, keys: readonly string[]): boolean`

Check if a dictionary contains any of the specified keys.

Returns `true` if at least one of the provided keys exists in the dictionary, `false` otherwise.

Examples
```ts
isKeys({ a: 1, b: 2 }, ['a', 'c']); // true
```

```ts
isKeys({ a: 1, b: 2 }, ['c', 'd']); // false
```

```ts
isKeys({}, ['a']); // false
```



#### isPlainObject

`isPlainObject(value: unknown): boolean`

Check if a value is a plain object.

Determines whether the given value is a plain object — an object created by `{}`, `new Object()`, or `Object.create(null)`. Returns `false` for arrays, class instances, and other non-plain objects.

Examples
```ts
isPlainObject({ a: 1, b: 2 }); // true
```

```ts
isPlainObject(Object.create(null)); // true
```

```ts
isPlainObject([1, 2, 3]); // false
```



#### iterate

`iterate(dict: T, iteratee: (value: T[keyof T], key: string, dict: T) => unknown): T`

Iterate over dictionary entries, invoking a callback for each key-value pair.

Iterates over own enumerable string-keyed properties of a dictionary,
calling the provided iteratee with the value, key, and the dictionary itself.
Iteration can be terminated early by returning `false` from the iteratee.

Examples
```ts
const logs = [];
iterate({ a: 1, b: 2 }, (value, key) => { logs.push([key, value]); });
logs; // [[a, 1], [b, 2]]
```

```ts
const logs = [];
iterate({ x: 10, y: 20, z: 30 }, (value) => {
  if (value >= 20) return false;
  logs.push(value);
});
logs; // [10]
```



#### map

`map(obj: Record<string, I>, cb: (value: I, key: string) => O): Record<string, O>`

Creates a new dictionary by mapping each value of the object.

Iterates over the dictionary and produces a new dictionary with the same keys, but values transformed by the provided callback function.

Examples
```ts
map({ a: 1, b: 2 }, (v) => v * 2); // { a: 2, b: 4 }
```

```ts
map({ a: 'hi' }, (v, k) => `${k}:${v}`); // { a: a:hi }
```

```ts
map({}, (v) => v); // {}
```



#### mapToArray

`mapToArray(obj: Record<string, I>, cb: (k: string, v: I) => O): O[]`

Maps an object's entries to an array.

Iterates over the dictionary entries and transforms them using the provided callback.

Examples
```ts
mapToArray({ a: 1, b: 2 }, (k, v) => `${k}${v}`); // [a1, b2]
```

```ts
mapToArray({ x: 10 }, (k, v) => v * 2); // [20]
```

```ts
mapToArray({}, (k, v) => v); // []
```



#### merge

`merge(dicts: [...T]): { [K in keyof import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict/merge").UnionToIntersection<T[number]>]: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict/merge").UnionToIntersection<T[number]>[K]; }`

Merge an array of dictionaries into a single dictionary.

Merges all dictionaries in the given array from left to right, with later entries overwriting earlier ones for duplicate keys.

Examples
```ts
merge([{ a: 1 }, { b: 2 }]); // { a: 1, b: 2 }
```

```ts
merge([{ a: 1 }, { a: 2, b: 3 }]); // { a: 2, b: 3 }
```

```ts
merge([{ x: 'hello' }, { y: 'world' }, { z: true }]); // { x: hello, y: world, z: true }
```



#### take

`take(obj: T, keys: K[]): Pick<T, K>`

Creates a partial subset of the original object type.

Extracts a subset of properties from an object type.

Examples
```ts
someOf({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```

```ts
someOf({ id: 1, name: 'A' }, ['id']); // { id: 1 }
```

```ts
someOf({ x: 10, y: 20 }, []); // {}
```



#### toString_

`toString_(dict: Dict<T>): string`


Converts a dictionary to a specific string format.

Examples
```ts
dictToString({}); // {}
```

```ts
dictToString({ a: 'b' }); // {a:b;}
```

```ts
dictToString({ k: 'v', id: '1' }); // {k:v;id:1;}
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