# @razomy/exceptions

[![TypeScript](https://img.shields.io/npm/types/@razomy/exceptions)](https://www.npmjs.com/package/@razomy/exceptions)
[![Node.js Version](https://img.shields.io/node/v/@razomy/exceptions)](https://www.npmjs.com/package/@razomy/exceptions)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/exceptions)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/exceptions)](https://www.npmjs.com/package/@razomy/exceptions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/exceptions)](https://bundlephobia.com/package/@razomy/exceptions)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/exceptions)](https://www.npmjs.com/package/@razomy/exceptions)

[Npm](https://www.npmjs.com/package/@razomy/exceptions) |
[Npmx](https://npmx.dev/package/@razomy/exceptions) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/exceptions) |
[Razomy Io](https://io.razomy.org/exceptions) |
[Razomy Cli](https://github.com/razomy/cli)

> A collection of standard, reusable exception classes for robust error handling

## 🚀 Start

### Install

```sh
npm i @razomy/exceptions
# or
bun add @razomy/exceptions
# or
razomy cli add @razomy/exceptions
```

### Import

```ts
import * as exceptions from '@razomy/exceptions';
// or
import * as exceptions from "npm:@razomy/exceptions";
// or
import * as exceptions from "https://esm.sh/@razomy/exceptions";
// or
import * as exceptions from "https://unpkg.com/@razomy/exceptions";
// or
import { assert } from '@razomy/exceptions';
// or
razomy run @razomy/exceptions assert
```

## 📑 Table of Contents

**Types**

- [CatchFn](#catchfn)

**Functions**

- [assert](#assert)

## 📚 Documentation

### Types

#### CatchFn

`type CatchFn = (throwable_fn: () => void) => void`

### Functions

#### assert

`assert(condition: boolean, message: undefined): undefined`

Asserts that a condition is true, throwing an error if it is false.
Evaluates a boolean condition. If the condition evaluates to false, it throws an Error with the provided message. This function is typically used for invariant checking, validating input, and ensuring expected program states at runtime.

Examples

```ts
assert(2 + 2 === 4); // void (execution continues normally)
```

```ts
assert(typeof 'hello' === 'number', 'Value must be a number'); // throws Error: Value must be a number
```

```ts
const user = getUser();
assert(user !== null, 'User cannot be null'); // throws Error: User cannot be null if user is null
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
