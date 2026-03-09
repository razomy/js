# @razomy/string-case

[![License](https://img.shields.io/npm/l/@razomy/string-case)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/string-case)](https://bundlephobia.com/package/@razomy/string-case)
[![TypeScript](https://img.shields.io/npm/types/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![Node.js Version](https://img.shields.io/node/v/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![npm version](https://img.shields.io/npm/v/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/string-case) |
[Npmx](https://npmx.dev/package/@razomy/string-case) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/string-case) |
[Io](https://io.razomy.org/string/case)

> A lightweight, zero-dependency TypeScript library for advanced string case conversions and manipulations.

## 🚀 Start

### Install

```sh
npm i @razomy/string-case
```

### Import

```ts
import * as stringCase from '@razomy/string-case';
// or
import { abbreviation } from '@razomy/string-case';
```

## 📑 Table of Contents

**Functions**

- [abbreviation](#abbreviation)
- [alternatingCase](#alternatingcase)
- [camelCase](#camelcase)
- [capitalize](#capitalize)
- [constantCase](#constantcase)
- [dotCase](#dotcase)
- [headerCase](#headercase)
- [humanize](#humanize)
- [isLowerCase](#islowercase)
- [isUpperCase](#isuppercase)
- [kebabCase](#kebabcase)
- [lowerCase](#lowercase)
- [pascalCase](#pascalcase)
- [pathCase](#pathcase)
- [reverse](#reverse)
- [sentenceCase](#sentencecase)
- [slugify](#slugify)
- [snakeCase](#snakecase)
- [swapCase](#swapcase)
- [titleCase](#titlecase)
- [upperCase](#uppercase)

## 📚 Documentation

### Functions

#### abbreviation

`abbreviation(text: string): string`

Get abbreviation from string.

Examples

```ts
abbreviation('Hello World'); // HW
```

```ts
abbreviation('node package manager'); // npm
```

```ts
abbreviation('Read-Only_Memory'); // ROM
```

#### alternatingCase

`alternatingCase(text: string): string`

Convert string to aLtErNaTiNg cAsE (SpongeBob case).

Alternates cases based on the index of the character (ignoring spaces is optional, this implementation alternates
strictly by character position).

Examples

```ts
alternatingCase('hello world'); // hElLo wOrLd
```

```ts
alternatingCase('typescript'); // tYpEsCrIpT
```

#### camelCase

`camelCase(text: string): string`

Converts a string to camel case.

Examples

```ts
camelCase('Foo Bar'); // fooBar
```

```ts
camelCase('--foo-bar--'); // fooBar
```

```ts
camelCase('__FOO_BAR__'); // fooBar
```

#### capitalize

`capitalize(text: string): string`

Converts the first character of string to upper case and the remaining to lower case.

Examples

```ts
capitalize('razomy'); // Razomy
```

```ts
capitalize('RAZOMY'); // Razomy
```

```ts
capitalize('rAZOMY'); // Razomy
```

#### constantCase

`constantCase(text: string): string`

Convert string to CONSTANT_CASE (macro case).

Examples

```ts
constantCase('hello world'); // HELLO_WORLD
```

```ts
constantCase('camelCaseString'); // CAMEL_CASE_STRING
```

```ts
constantCase('kebab-case-test'); // KEBAB_CASE_TEST
```

#### dotCase

`dotCase(text: string): string`

Convert string to dot.case.

Examples

```ts
dotCase('Hello World'); // hello.world
```

```ts
dotCase('camelCaseString'); // camel.case.string
```

```ts
dotCase('foo_bar'); // foo.bar
```

#### headerCase

`headerCase(text: string): string`

Convert string to Header-Case (Train-Case).

Examples

```ts
headerCase('hello world'); // Hello-World
```

```ts
headerCase('camelCaseString'); // Camel-Case-String
```

```ts
headerCase('session_id'); // Session-Id
```

#### humanize

`humanize(text: string): string`

Convert a string to a human-readable form.

Examples

```ts
humanize('camelCase'); // Camel case
```

```ts
humanize('snake_case_string'); // Snake case string
```

```ts
humanize('kebab-case-string'); // Kebab case string
```

#### isLowerCase

`isLowerCase(text: string): boolean`

Checks if the string is lower case.

Examples

```ts
isLowerCase('razomy'); // true
```

```ts
isLowerCase('Razomy'); // false
```

```ts
isLowerCase('string with 123'); // true
```

#### isUpperCase

`isUpperCase(text: string): boolean`

Check if a string is upper case.

Examples

```ts
isUpperCase('HELLO'); // true
```

```ts
isUpperCase('Hello'); // false
```

```ts
isUpperCase('hello'); // false
```

#### kebabCase

`kebabCase(text: string): string`

Convert string to kebab case.

Examples

```ts
kebabCase('fooBar'); // foo-bar
```

```ts
kebabCase('Foo Bar'); // foo-bar
```

```ts
kebabCase('__FOO_BAR__'); // foo-bar
```

#### lowerCase

`lowerCase(text: string): string`

Converts a string to lower case.

Examples

```ts
lowerCase('RAZOMY'); // razomy
```

```ts
lowerCase('Test'); // test
```

```ts
lowerCase('FOO Bar'); // foo bar
```

#### pascalCase

`pascalCase(text: string): string`

Convert string to pascal case.

Examples

```ts
pascalCase('foo bar'); // FooBar
```

```ts
pascalCase('foo_bar'); // FooBar
```

```ts
pascalCase('FOO BAR'); // FooBar
```

#### pathCase

`pathCase(text: string): string`

Convert string to path/case.

Examples

```ts
pathCase('Hello World'); // hello/world
```

```ts
pathCase('camelCaseString'); // camel/case/string
```

```ts
pathCase('foo_bar'); // foo/bar
```

#### reverse

`reverse(text: string): string`

Reverses the given string.

Examples

```ts
reverse('abc'); // cba
```

```ts
reverse('qwerty'); // ytrewq
```

```ts
reverse('123'); // 321
```

#### sentenceCase

`sentenceCase(text: string): string`

Convert string to Sentence case.

Only the first letter of the result is capitalized, the rest is lowercase.

Examples

```ts
sentenceCase('helloWorld'); // Hello world
```

```ts
sentenceCase('HELLO WORLD'); // Hello world
```

```ts
sentenceCase('foo_bar_baz'); // Foo bar baz
```

#### slugify

`slugify(text: string): string`

Convert string to url friendly slug.

Examples

```ts
slugify('Hello World'); // hello-world
```

```ts
slugify('Foo & Bar'); // foo-bar
```

```ts
slugify('Crème Brûlée'); // creme-brulee
```

#### snakeCase

`snakeCase(text: string): string`

Convert string to snake case.

Examples

```ts
snakeCase('fooBar'); // foo_bar
```

```ts
snakeCase('Foo Bar'); // foo_bar
```

```ts
snakeCase('FOO-BAR'); // foo_bar
```

#### swapCase

`swapCase(text: string): string`

Convert string by swapping the case of every character.

Uppercase becomes lowercase, and lowercase becomes uppercase.

Examples

```ts
swapCase('Hello World'); // hELLO wORLD
```

```ts
swapCase('camelCase'); // CAMELcASE
```

```ts
swapCase('123 ABC xyz'); // 123 abc XYZ
```

#### titleCase

`titleCase(text: string): string`

Convert string to title case.

Examples

```ts
titleCase('foo bar'); // Foo Bar
```

```ts
titleCase('HELLO WORLD'); // Hello World
```

```ts
titleCase('one-two'); // One-two
```

#### upperCase

`upperCase(text: string): string`

Convert string to upper case.

Examples

```ts
upperCase('test'); // TEST
```

```ts
upperCase('Hello World'); // HELLO WORLD
```

```ts
upperCase('razomy'); // RAZOMY
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

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new
issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
