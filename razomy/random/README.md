# @razomy/random

[![TypeScript](https://img.shields.io/npm/types/@razomy/random)](https://www.npmjs.com/package/@razomy/random)
[![Node.js Version](https://img.shields.io/node/v/@razomy/random)](https://www.npmjs.com/package/@razomy/random)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/random)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/random)](https://www.npmjs.com/package/@razomy/random)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/random)](https://bundlephobia.com/package/@razomy/random)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/random)](https://www.npmjs.com/package/@razomy/random)

[Npm](https://www.npmjs.com/package/@razomy/random) |
[Npmx](https://npmx.dev/package/@razomy/random) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/random) |
[Razomy Io](https://io.razomy.org/random) |
[Razomy Cli](https://github.com/razomy/cli)

> Utility functions for safely generating random numbers, strings, and arbitrary values

## 🚀 Start

### Install

```sh
npm i @razomy/random
# or
bun add @razomy/random
# or
razomy cli add @razomy/random
```

### Import

```ts
import * as random from '@razomy/random';
// or
import * as random from "npm:@razomy/random";
// or
import * as random from "https://esm.sh/@razomy/random";
// or
import * as random from "https://unpkg.com/@razomy/random";
// or
import { createCssGradient } from '@razomy/random';
// or
razomy run @razomy/random createCssGradient
```

## 📑 Table of Contents

**Types**

- [digits](#digits)
- [hexLength](#hexlength)
- [loremWords](#loremwords)
- [lower](#lower)
- [maxAngle](#maxangle)
- [maxRgb](#maxrgb)
- [minLength](#minlength)
- [specials](#specials)
- [upper](#upper)

**Functions**

- [createCssGradient](#createcssgradient)
- [createDate](#createdate)
- [createFloat](#createfloat)
- [createFloatRange](#createfloatrange)
- [createGuid](#createguid)
- [createInt](#createint)
- [createIpv4](#createipv4)
- [createLightHexColor](#createlighthexcolor)
- [createLorem](#createlorem)
- [createMac](#createmac)
- [createPassword](#createpassword)
- [createPinCode](#createpincode)
- [createRecoveryKeys](#createrecoverykeys)
- [createString](#createstring)
- [createUuid](#createuuid)
- [isYesOrNo](#isyesorno)
- [pickItem](#pickitem)
- [rollDice](#rolldice)
- [shuffleArray](#shufflearray)
- [splitIntoGroups](#splitintogroups)

## 📚 Documentation

### Types

#### digits

`const digits: String`

#### hexLength

`const hexLength: Number`

#### loremWords

`const loremWords: Array<String>`

#### lower

`const lower: String`

#### maxAngle

`const maxAngle: Number`

#### maxRgb

`const maxRgb: Number`

#### minLength

`const minLength: Number`

#### specials

`const specials: String`

#### upper

`const upper: String`

### Functions

#### createCssGradient

`createCssGradient(): String`

Create a random CSS linear gradient string.
Generates a CSS linear-gradient with a random angle (0–360°) and two random hex colors.

Examples

```ts
createCssGradient(); // linear-gradient(142deg, #a3f0b1, #0d44ec)
```

```ts
createCssGradient(); // linear-gradient(0deg, #000000, #ffffff)
```

```ts
createCssGradient(); // linear-gradient(270deg, #ff6347, #4682b4)
```

#### createDate

`createDate(startYear: Number, endYear: Number): String`

Create a random date string within a year range.
Generates a random date between the start of `startYear` and the end of `endYear`,
returning it as a formatted string in `YYYY-MM-DD HH:mm:ss` format.

Examples

```ts
createDate(); // e.g. 2015-07-23 14:05:32
```

```ts
createDate(2020, 2020); // e.g. 2020-09-11 03:42:17
```

```ts
createDate(1990, 2000); // e.g. 1994-02-08 21:30:44
```

#### createFloat

`createFloat(): Number`

Create a cryptographically secure random float in [0, 1).
Generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
using the Web Crypto API for cryptographic randomness.

Examples

```ts
createFloat(); // 0.7382194561
```

```ts
createFloat(); // 0.0231587943
```

```ts
createFloat(); // 0.9481726350
```

#### createFloatRange

`createFloatRange(from: Number, to: Number): Number`

Generate a random float within a specified range [from, to).
Creates a random floating-point number between `from` (inclusive) and `to` (exclusive)
using uniform distribution.

Examples

```ts
createFloatRange(0, 1); // 0.7234...
```

```ts
createFloatRange(-5, 5); // -2.318...
```

```ts
createFloatRange(100, 200); // 142.857...
```

#### createGuid

`createGuid(): String`

Create a RFC4122-like GUID string.
Generates a 32-hex-character GUID formatted as `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

Examples

```ts
createGuid(); // a3f1b2c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6
```

```ts
createGuid(); // 1b4e28ba-2fa1-11d2-883f-b9a761bde3fb
```

```ts
const id = createGuid();
id.length; // 36
```

#### createInt

`createInt(min: Number, max: Number): Number`

Generate a random integer within a range.
Generates a random integer between `min` (inclusive) and `max` (inclusive) using a uniform distribution.

Examples

```ts
createInt(); // 42 (random integer between 0 and 100)
```

```ts
createInt(1, 10); // 7 (random integer between 1 and 10)
```

```ts
createInt(-5, 5); // -3 (random integer between -5 and 5)
```

#### createIpv4

`createIpv4(): String`

Generate a random IPv4 address string.
Creates a random IPv4 address by generating four random integers in the range [0, 255] and joining them with dots.

Examples

```ts
createIpv4(); // 192.168.1.42
```

```ts
createIpv4(); // 10.0.254.3
```

```ts
createIpv4(); // 0.127.255.12
```

#### createLightHexColor

`createLightHexColor(): String`

Create a random light hex color string.
Generates a random hex color in the light spectrum by constraining
each RGB channel to the range [127, 255], producing pastel/light colors.

Examples

```ts
createLightHexColor(); // #a3f0c7
```

```ts
createLightHexColor(); // #e2b4ff
```

```ts
createLightHexColor(); // #7ff89d
```

#### createLorem

`createLorem(wordCount: Number): String`

Generates random Lorem Ipsum text.
Generates a random sequence of Lorem Ipsum words of the specified length. The resulting string is capitalized and ends with a period.

Examples

```ts
createLorem(3); // Dolor sit amet.
```

```ts
createLorem(5); // Elit sed do eiusmod tempor.
```

```ts
createLorem(1); // Consectetur.
```

#### createMac

`createMac(): String`

Create a random MAC address.
Generates a random MAC address string in uppercase with colon-separated octets.

Examples

```ts
createMac(); // A3:4F:B2:00:CC:91
```

```ts
createMac(); // 0E:7D:3A:F1:58:C4
```

```ts
createMac(); // FF:12:9B:6E:D0:47
```

#### createPassword

`createPassword(length: Number): String`

Create a random password.
Generates a random password of the specified length containing at least one uppercase letter, one lowercase letter, one digit, and one special character. The result is shuffled to avoid predictable positions.

Examples

```ts
createPassword(); // aG3!xK9@mNq#pR7& (16 characters)
```

```ts
createPassword(4); // k2A! (4 characters, one from each group)
```

```ts
createPassword(32); // xP4!rQ8@wN2#mK7&jL5$tH9^yB1*zF6+ (32 characters)
```

#### createPinCode

`createPinCode(length: Number): String`

Create a random PIN code of a given length with no consecutive repeated digits.
Generates a numeric PIN code string of the specified length (default 6).
Each digit is randomly chosen from 0–9, ensuring no two consecutive digits are the same.

Examples

```ts
createPinCode(); // 482973 (6-digit PIN, no consecutive repeats)
```

```ts
createPinCode(4); // 3917 (4-digit PIN, no consecutive repeats)
```

```ts
createPinCode(1); // 7 (single-digit PIN)
```

#### createRecoveryKeys

`createRecoveryKeys(count: Number, blocks: Number, blockLength: Number): Array<String>`

Create an array of recovery keys.
Generates a list of recovery keys, each composed of uppercase alphanumeric blocks separated by dashes.

Examples

```ts
createRecoveryKeys(1, 2, 3); // [A7K-9BZ]
```

```ts
createRecoveryKeys(2); // [AXRF-K9B2-QLMZ-7TYP, JN3W-8DVE-0HCS-4FRA]
```

```ts
createRecoveryKeys(3, 3, 5); // [AX7RF-K9BQ2-LMZTK, JN3W8-DVE0H-CS4FR, PL9YT-QWE3R-ZXC7V]
```

#### createString

`createString(length: Number, characters: String): String`

Generates a random string.
Generates a random string of specified length using optional custom characters.

Examples

```ts
randomString(3); // X7z
```

```ts
randomString(5, '01'); // 10101
```

```ts
randomString(4, 'a'); // aaaa
```

#### createUuid

`createUuid(): String`

Create a UUID v4 string.
Generates a cryptographically random UUID v4 string using the Web Crypto API.

Examples

```ts
createUuid(); // a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d
```

```ts
createUuid(); // 550e8400-e29b-41d4-a716-446655440000
```

```ts
const id = createUuid();
id.length; // 36
```

#### isYesOrNo

`isYesOrNo(): Boolean`

Randomly returns true or false with equal probability.
Generates a random float and returns true if it exceeds 0.5, false otherwise.

Examples

```ts
isYesOrNo(); // true
```

```ts
isYesOrNo(); // false
```

```ts
const answer: boolean = isYesOrNo(); // true | false
```

#### pickItem

`pickItem(array: Array<T>): T`

Pick a random item from a non-empty array.
Selects and returns a single random element from the provided array using a uniform random integer generator.

Examples

```ts
pickItem([1, 2, 3]); // 2 (random)
```

```ts
pickItem(['a', 'b', 'c', 'd']); // c (random)
```

```ts
pickItem([true]); // true
```

#### rollDice

`rollDice(diceCount: Number, sides: Number): Array<Number>`

Roll one or more dice and return the results.
Simulates rolling a specified number of dice, each with a given number of sides, returning an array of random integer results.

Examples

```ts
rollDice(); // [3, 5] (two six-sided dice)
```

```ts
rollDice(1, 20); // [14] (one twenty-sided die)
```

```ts
rollDice(4, 6); // [2, 6, 1, 4] (four six-sided dice)
```

#### shuffleArray

`shuffleArray(array: T[]): T[]`

Shuffle an array using the Fisher-Yates algorithm.
Creates a new array with elements randomly shuffled using the Fisher-Yates algorithm. The original array is not modified.

Examples

```ts
shuffleArray([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4]
```

```ts
shuffleArray(['a', 'b', 'c']); // [c, a, b]
```

```ts
shuffleArray([42]); // [42]
```

#### splitIntoGroups

`splitIntoGroups(array: T[], groupsCount: Number): T[][]`

Split an array into a specified number of groups with randomly distributed elements.
Shuffles the input array and distributes elements round-robin into the specified number of groups. The original array is not mutated.

Examples

```ts
splitIntoGroups([1, 2, 3, 4], 2); // e.g. [[3, 1], [4, 2]]
```

```ts
splitIntoGroups(['a', 'b', 'c'], 3); // e.g. [[b], [c], [a]]
```

```ts
splitIntoGroups([10, 20, 30, 40, 50], 2); // e.g. [[30, 50, 10], [20, 40]]
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
