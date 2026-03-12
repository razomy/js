# @razomy/dict-recursive

[![License](https://img.shields.io/npm/l/@razomy/dict-recursive)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/dict-recursive)](https://bundlephobia.com/package/@razomy/dict-recursive)
[![TypeScript](https://img.shields.io/npm/types/@razomy/dict-recursive)](https://www.npmjs.com/package/@razomy/dict-recursive)
[![Node.js Version](https://img.shields.io/node/v/@razomy/dict-recursive)](https://www.npmjs.com/package/@razomy/dict-recursive)
[![npm version](https://img.shields.io/npm/v/@razomy/dict-recursive)](https://www.npmjs.com/package/@razomy/dict-recursive)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/dict-recursive)](https://www.npmjs.com/package/@razomy/dict-recursive)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/dict-recursive) |
[Npmx](https://npmx.dev/package/@razomy/dict-recursive) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/dict-recursive) |
[Io](https://io.razomy.org/dict/recursive)

>

## 🚀 Start

### Install

```sh
npm i @razomy/dict-recursive
```

### Import

```ts
import * as dictRecursive from '@razomy/dict-recursive';
// or
import { deleteByPathMut } from '@razomy/dict-recursive';
```

## 📑 Table of Contents

**Functions**

- [deleteByPathMut](#deletebypathmut)
- [flat](#flat)
- [getAny](#getany)
- [getAnyAll](#getanyall)
- [getByPath](#getbypath)
- [mergeDeepMut](#mergedeepmut)
- [moveByPathMut](#movebypathmut)
- [setByPathMut](#setbypathmut)

## 📚 Documentation

### Functions

#### deleteByPathMut

`deleteByPathMut(obj: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/recursive").DictRecursive, path: string): void`

Delete a nested property from a recursive dictionary by dot-separated path.

Traverses a recursive dictionary using a dot-separated path string
and deletes the property at the final key. If any intermediate segment does not
exist or is not a nested dictionary, the operation is a no-op.

Examples

```ts
const obj = { a: { b: { c: 1 } } };
deleteByPathMut(obj, 'a.b.c');
obj; // { a: { b: {} } }
```

```ts
const obj = { x: { y: 2 }, z: 3 };
deleteByPathMut(obj, 'z');
obj; // { x: { y: 2 } }
```

```ts
const obj = { a: { b: 1 } };
deleteByPathMut(obj, 'a.nonexistent');
obj; // { a: { b: 1 } } (no change)
```

#### flat

`flat(obj: T, parentKey: string, result: Record<string, unknown>): import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/flat").FlattenedAndConverted<T>`

Flatten a nested object into a single-level object with dot-separated keys.

Recursively traverses a nested plain object and produces a flat object
where each key is a dot-delimited path representing the original nesting structure.
Non-plain-object values are preserved as leaf values.

Examples

```ts
flat({ a: 1, b: 2 }); // { a: 1, b: 2 }
```

```ts
flat({ a: { b: { c: 3 } } }); // { a.b.c: 3 }
```

```ts
flat({ x: { y: 1 }, z: [2, 3] }); // { x.y: 1, z: [2, 3] }
```

#### getAny

`getAny(dict: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict/dict").Dict<unknown>, keys: string[]): string[]`

Recursively find all paths in a nested dict that contain the specified keys.

Traverses a nested dictionary (objects and arrays) and returns an array of
colon-separated paths leading to nodes that contain all of the specified keys.

Examples

```ts
getAny({ a: { name: 'x', id: 1 } }, ['name', 'id']); // [a:]
```

```ts
getAny({ a: { b: { name: 'x', id: 1 } } }, ['name', 'id']); // [a:b:]
```

```ts
getAny({ a: 'hello', b: { name: 'y' } }, ['name']); // [b:]
```

#### getAnyAll

`getAnyAll(dict: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict/dict").Dict<unknown>, keys: string[]): string[]`

Recursively find all paths in a nested dict where the specified keys exist.

Traverses a nested dictionary (objects and arrays) and collects all colon-separated
paths leading to nodes that contain all of the specified keys.

Examples

```ts
getAnyAll({ a: 1, b: 2 }, ['a', 'b']); // []
```

```ts
getAnyAll({ x: { a: 1, b: 2 } }, ['a', 'b']); // [x:]
```

```ts
getAnyAll({ x: { y: { a: 1, b: 2 } }, z: { a: 1, b: 2 } }, ['a', 'b']); // [x:y:, z:]
```

#### getByPath

`getByPath(dict: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/recursive").DictRecursive, path: string): unknown`

Get a value from a nested dictionary by dot-separated path.

Traverses a recursive dictionary using a dot-separated path string,
returning the value at the specified location or `undefined` if the path does not exist.

Examples

```ts
getByPath({ a: { b: { c: 42 } } }, 'a.b.c'); // 42
```

```ts
getByPath({ x: { y: 'hello' } }, 'x.y'); // hello
```

```ts
getByPath({ a: { b: 1 } }, 'a.z'); // undefined
```

#### mergeDeepMut

`mergeDeepMut(target: T, sources: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/recursive").DictRecursive[]): T`

Deep merge multiple recursive dictionaries into a target.

Recursively merges properties from one or more source dictionaries into the target dictionary. Nested objects are merged
deeply rather than replaced. Primitive values in sources overwrite those in the target. Mutates the target in place.

Examples

```ts
mergeDeepMut({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```

```ts
mergeDeepMut({ a: { x: 1 } }, { a: { y: 2 } }); // { a: { x: 1, y: 2 } }
```

```ts
mergeDeepMut({ a: 1 }, { a: { nested: true } }, { b: 3 }); // { a: { nested: true }, b: 3 }
```

#### moveByPathMut

`moveByPathMut(dict: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/recursive").DictRecursive, oldPath: string, newPath: string): void`

Move a value from one path to another within a recursive dictionary.

Retrieves the value at `oldPath`, sets it at `newPath`, and deletes the value at `oldPath`.
Throws if the value at `oldPath` is `undefined`.

Examples

#### setByPathMut

`setByPathMut(obj: import("/Volumes/resource/resource/razomy/code/js.chunk/razomy/dict-recursive/recursive").DictRecursive, path: string, value: unknown): void`

Set a value in a nested dictionary by dot-separated path.

Traverses or creates nested objects along the dot-separated path and sets the final key to the given value.

Examples

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

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new
issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
