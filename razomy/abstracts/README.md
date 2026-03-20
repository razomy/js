# @razomy/abstracts

[![License](https://img.shields.io/npm/l/@razomy/abstracts)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/abstracts)](https://bundlephobia.com/package/@razomy/abstracts)
[![TypeScript](https://img.shields.io/npm/types/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![Node.js Version](https://img.shields.io/node/v/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![npm version](https://img.shields.io/npm/v/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/abstracts) |
[Npmx](https://npmx.dev/package/@razomy/abstracts) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/abstracts) |
[Io](https://io.razomy.org/abstracts)

>

# Abstracts

Contains all core reusable types and interfaces.

**System Layer** (Performance, Execution, Data Layout)

1. ~~**hardware** hardware structures, including CPU, GPU, TPU,~~
2. **primitives** — Abstractions defining low-level and memory/processing units.
3. ~~**memory** — аллокаторы, указатели, буферы.~~
4. ~~**concurrency** — потоки, мьютексы, event loops, promises.~~
5. ~~**io_streams** — сокеты, файловые дескрипторы, стримы.~~
6. **functions** — Abstractions defining behavioral contracts, such as creation and execution pipelines.
7. **arrays** — Linear memory data structures.
8. **structures** — Core building blocks for memory organization and data coordination, serving as a foundation for
   complex templates.
9. **collections** — Abstractions for mapping data and ordering it in a performance-optimized way (e.g., maps, sets,
   queues).
10. **graphs** — Graph and tree-like data structures.
11. **probabilistics** — Matrices and probabilistic data structures.
12. **meta** — Utilities designed to generalize and unify the TypeScript development experience alongside other
    languages.

**Application Layer** (Logic, Behavior, Domain)

1. **domains** — Interfaces, data templates, domain responsibilities.
2. **pattens** — Data transforming organizing templates.
3. **machines** — стейт-машины, акторы (Actors), оркестраторы..
4. ~~**events** — шины событий, Pub/Sub, реактивные потоки.~~
5. ~~**contracts** — монады (`Result`, `Option`), валидаторы, обработчики ошибок.~~
6. ~~**ports** — абстракции внешнего мира (интерфейсы к БД, сети, UI, Ports/Adapters).~~

## 🚀 Start

### Install

```sh
npm i @razomy/abstracts
```

### Import

```ts
import * as abstracts from '@razomy/abstracts';
// or
import {functionName} from '@razomy/abstracts';
```

## 📑 Table of Contents

## 📚 Documentation

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
