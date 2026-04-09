# @razomy/string-case

[![TypeScript](https://img.shields.io/npm/types/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![Node.js Version](https://img.shields.io/node/v/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/string-case)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/string-case)](https://bundlephobia.com/package/@razomy/string-case)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/string-case)](https://www.npmjs.com/package/@razomy/string-case)

[Npm](https://www.npmjs.com/package/@razomy/string-case) |
[Npmx](https://npmx.dev/package/@razomy/string-case) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/string-case) |
[Razomy Io](https://io.razomy.org/string/case) |
[Razomy Cli](https://github.com/razomy/cli)

> Utility functions for advanced string casing conversions and manipulations

## 🚀 Start

### Install

```sh
npm i @razomy/string-case
# or
bun add @razomy/string-case
# or
razomy cli add @razomy/string-case
```

### Import

```ts
import * as stringCase from '@razomy/string-case';
// or
import * as stringCase from "npm:@razomy/string-case";
// or
import * as stringCase from "https://esm.sh/@razomy/string-case";
// or
import * as stringCase from "https://unpkg.com/@razomy/string-case";
// or
import { abbreviation } from '@razomy/string-case';
// or
razomy run @razomy/string-case abbreviation
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
- [isAlpha](#isalpha)
- [isAlphanumeric](#isalphanumeric)
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

`abbreviation(text: String): String`

Get abbreviation from string.
Takes a string of words separated by spaces, hyphens, or underscores,
and returns an abbreviation formed by concatenating the first letter of each word.

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

`alternatingCase(text: String): String`

Convert string to aLtErNaTiNg cAsE (SpongeBob case).
Alternates cases based on the index of the character (ignoring spaces is optional, this implementation alternates strictly by character position).

Examples

```ts
alternatingCase('hello world'); // hElLo wOrLd
```

```ts
alternatingCase('typescript'); // tYpEsCrIpT
```

#### camelCase

`camelCase(text: String): String`

Converts a string to camel case.
Takes an input string in any common format (space-separated, kebab-case, snake_case, PascalCase, etc.)
and converts it to camelCase. The function first normalizes the string by identifying word boundaries
(including transitions between acronyms, letters/numbers, and common delimiters like spaces, hyphens, dots, and underscores),
then joins the segments together with the first segment in lowercase and each subsequent segment capitalized.

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

`capitalize(text: String): String`

Converts the first character of string to upper case and the remaining to lower case.
Takes an input string and returns a new string where the first character is converted to upper case and all remaining characters are converted to lower case. This is useful for normalizing the casing of words regardless of their original casing.

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

`constantCase(text: String): String`

Convert string to CONSTANT_CASE (macro case).
Converts a given string from any common casing convention (camelCase, kebab-case,
snake_case, space-separated, etc.) to CONSTANT_CASE (also known as macro case or screaming snake case),
where all letters are uppercased and words are separated by underscores.

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

`dotCase(text: String): String`

Convert string to dot.case.
Converts a given string into dot.case format by splitting the input on
camelCase boundaries, non-alphanumeric characters, and whitespace, then joining
the resulting lowercase words with dots.

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

`headerCase(text: String): String`

Convert string to Header-Case (Train-Case).
Converts a given string into Header-Case (also known as Train-Case), where each word is capitalized
and separated by hyphens. The function handles various input formats including camelCase, snake_case,
and strings with arbitrary delimiters by first splitting the text into individual words, capitalizing
the first letter of each word, lowercasing the rest, and then joining them with hyphens.

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

`humanize(text: String): String`

Convert a string to a human-readable form.
Transforms a string from common programming naming conventions (camelCase, snake_case, kebab-case)
into a human-readable sentence. It splits words by detecting camelCase boundaries, underscores, and hyphens,
normalizes whitespace, converts the result to lowercase, and capitalizes the first letter.

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

#### isAlpha

`isAlpha(text: String): Boolean`

Checks if the string contains only alphabetic characters.
Determines whether the given string consists exclusively of alphabetic characters (a-z, A-Z). Returns `false` for empty strings, strings containing digits, whitespace, special characters, or any non-alphabetic characters. The check is performed using a regular expression that matches one or more alphabetic characters spanning the entire string.

Examples

```ts
isAlpha('Razomy'); // true
```

```ts
isAlpha('R4zomy'); // false
```

```ts
isAlpha(''); // false
```

#### isAlphanumeric

`isAlphanumeric(text: String): Boolean`

Check if the string contains only alphanumeric characters.
Tests whether the given string consists exclusively of alphanumeric characters (letters a-z, A-Z and digits 0-9) using a regular expression. Returns false for empty strings, strings containing spaces, special characters, or any non-alphanumeric content.

Examples

```ts
isAlphanumeric('Razomy1'); // true
```

```ts
isAlphanumeric('Razomy-String'); // false
```

```ts
isAlphanumeric(' '); // false
```

#### isLowerCase

`isLowerCase(text: String): Boolean`

Checks if the string is lower case.
Determines whether the entire input string is in lower case by comparing it to its lower-cased equivalent. Non-alphabetic characters (such as digits, spaces, and symbols) do not affect the result, as they have no case and remain unchanged by the lower case conversion.

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

`isUpperCase(text: String): Boolean`

Check if a string is upper case.
Determines whether the given string is entirely in upper case by comparing it to its upper-cased transformation. Returns true only if every character in the string is already upper case (i.e., the string is identical to the result of calling `toUpperCase()` on it).

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

`kebabCase(text: String): String`

Convert string to kebab case.
Converts a given string to kebab-case by handling acronyms, camelCase, letter-number boundaries,
and various delimiters (spaces, underscores, hyphens, dots). Leading and trailing separators are stripped,
and the result is lowercased.

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

`lowerCase(text: String): String`

Converts a string to lower case.
Converts all characters in the given string to their lower case equivalents using the built-in `toLowerCase` method. The original string is not modified; a new lower cased string is returned.

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

`pascalCase(text: String): String`

Convert string to pascal case.
Converts a given string to PascalCase by splitting it into words
(handling spaces, underscores, and camelCase/UPPERCASE boundaries),
capitalizing the first letter of each word, lowercasing the rest,
and joining them together without any separator.

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

`pathCase(text: String): String`

Convert string to path/case.
Converts a given string into path/case format by splitting it on camelCase boundaries,
non-alphanumeric characters, and whitespace, then joining the resulting lowercase words with forward slashes.

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

`reverse(text: String): String`

Reverses the given string.
Reverses the order of characters in the given string by spreading it into an array of individual characters,
reversing the array, and joining the characters back into a string. This approach correctly handles multi-byte
Unicode characters (such as emojis) by using the spread operator, which splits on code points rather than code units.

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

`sentenceCase(text: String): String`

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

`slugify(text: String): String`

Convert string to url friendly slug.
Converts a given string into a URL-friendly slug by normalizing unicode characters
(removing diacritics/accents), converting to lowercase, replacing non-alphanumeric characters
with hyphens, and trimming leading/trailing hyphens.

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

`snakeCase(text: String): String`

Convert string to snake case.
Converts a given string to snake_case format by handling acronyms, camelCase,
letter-to-number and number-to-letter boundaries, and replacing common delimiters
(spaces, hyphens, dots) with underscores. The result is trimmed of leading/trailing
underscores and converted to lowercase.

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

`swapCase(text: String): String`

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

`titleCase(text: String): String`

Convert string to title case.
Converts the input string to title case by first lowercasing the entire string,
then capitalizing the first letter of each word. Word boundaries are determined by the `\b`
regex anchor, so hyphenated words and other non-alphabetic separators only trigger
capitalization at the start of each word boundary segment.

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

`upperCase(text: String): String`

Convert string to upper case.
Converts all characters in the given string to their upper-case equivalents using the built-in `String.prototype.toUpperCase` method. The original string is not modified; a new upper-cased string is returned.

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

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
