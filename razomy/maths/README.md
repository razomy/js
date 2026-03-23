# @razomy/maths

[![TypeScript](https://img.shields.io/npm/types/@razomy/maths)](https://www.npmjs.com/package/@razomy/maths)
[![Node.js Version](https://img.shields.io/node/v/@razomy/maths)](https://www.npmjs.com/package/@razomy/maths)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/maths)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/maths)](https://www.npmjs.com/package/@razomy/maths)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/maths)](https://bundlephobia.com/package/@razomy/maths)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/maths)](https://www.npmjs.com/package/@razomy/maths)

[Npm](https://www.npmjs.com/package/@razomy/maths) |
[Npmx](https://npmx.dev/package/@razomy/maths) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/maths) |
[Razomy Io](https://io.razomy.org/maths) |
[Razomy Cli](https://github.com/razomy/cli)

>

## 🚀 Start

### Install

```sh
npm i @razomy/maths
# or
bun add @razomy/maths
# or
razomy cli add @razomy/maths
```

### Import

```ts
import * as maths from '@razomy/maths';
// or
import * as maths from "npm:@razomy/maths";
// or
import * as maths from "https://esm.sh/@razomy/maths";
// or
import * as maths from "https://unpkg.com/@razomy/maths";
// or
import { calculate } from '@razomy/maths';
// or
razomy run @razomy/maths calculate
```

## 📑 Table of Contents

**Functions**

- [calculate](#calculate)

## 📚 Documentation

### Functions

#### calculate

`calculate(text: string): string`

Evaluates a mathematical expression from a string.
Parses and evaluates the given string as a mathematical expression using the mathjs library. It supports basic arithmetic, advanced mathematical functions, units, and complex operations. More https://mathjs.org/examples/index.html

Examples

```ts
calculate('1.2 * (2 + 4.5)'); // 7.8
```

```ts
calculate('sin(45 deg) ^ 2'); // 0.5
```

```ts
calculate('5.08 cm to inch'); // 2 inch
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
