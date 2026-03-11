# @razomy/string

[![License](https://img.shields.io/npm/l/@razomy/string)](https://github.com/razomy/js/blob/main/LICENSE)
[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/string)](https://bundlephobia.com/package/@razomy/string)
[![TypeScript](https://img.shields.io/npm/types/@razomy/string)](https://www.npmjs.com/package/@razomy/string)
[![Node.js Version](https://img.shields.io/node/v/@razomy/string)](https://www.npmjs.com/package/@razomy/string)
[![npm version](https://img.shields.io/npm/v/@razomy/string)](https://www.npmjs.com/package/@razomy/string)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/string)](https://www.npmjs.com/package/@razomy/string)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)

[Npm](https://www.npmjs.com/package/@razomy/string) | 
[Npmx](https://npmx.dev/package/@razomy/string) | 
[GitHub](https://github.com/razomy/js/tree/main/razomy/string) | 
[Io](https://io.razomy.org/string)

>

## 🚀 Start
### Install
```sh
npm i @razomy/string
```

### Import
```ts
import * as string from "@razomy/string";
// or
import { addByIndexString } from "@razomy/string";
```

## 📑 Table of Contents
**Functions**
- [addByIndexString](#addbyindexstring)
- [contains](#contains)
- [countOccurrences](#countoccurrences)
- [countSpaceMargin](#countspacemargin)
- [countSpaceMarginByArray](#countspacemarginbyarray)
- [countString](#countstring)
- [create](#create)
- [escapeByString](#escapebystring)
- [getWords](#getwords)
- [indentLines](#indentlines)
- [isEndsWith](#isendswith)
- [isEndsWithAny](#isendswithany)
- [isNullOrEmpty](#isnullorempty)
- [isStartsWith](#isstartswith)
- [isString](#isstring)
- [join](#join)
- [levenshteinDistance](#levenshteindistance)
- [merge](#merge)
- [padEnd](#padend)
- [padStart](#padstart)
- [prefixLines](#prefixlines)
- [removeIndex](#removeindex)
- [repeat](#repeat)
- [replace](#replace)
- [similarity](#similarity)
- [split](#split)
- [splitLines](#splitlines)
- [stripTags](#striptags)
- [takeAfter](#takeafter)
- [takeBefore](#takebefore)
- [takeBetween](#takebetween)
- [toBuffer](#tobuffer)
- [trim](#trim)
- [truncate](#truncate)
- [unescapeByString](#unescapebystring)

## 📚 Documentation
### Functions
#### addByIndexString

`addByIndexString(text: string, index: number, insertion: string): string`

Insert a string into another string at a specific index.



Examples
```ts
addByIndexString('-text', 0, 'prefix'); // prefix-text
```

```ts
addByIndexString('hello ', 6, 'world'); // hello world
```

```ts
addByIndexString('foo baz', 4, 'bar '); // foo bar baz
```



#### contains

`contains(text: string, search: string): boolean`

Checks if a string contains a specific substring.



Examples
```ts
contains('razomy', 'zo'); // true
```

```ts
contains('razomy', 'bar'); // false
```

```ts
contains('hello world', 'hello'); // true
```



#### countOccurrences

`countOccurrences(text: string, substring: string): number`

Counts the number of occurrences of a substring within a text.



Examples
```ts
countOccurrences('hello world', 'l'); // 3
```

```ts
countOccurrences('aaaa', 'aa'); // 2
```

```ts
countOccurrences('apple', 'z'); // 0
```



#### countSpaceMargin

`countSpaceMargin(string: string): number`

Count leading space margin of a string.

Counts the number of leading space characters before the first non-space character in a string.

Examples
```ts
countSpaceMargin('hello'); // 0
```

```ts
countSpaceMargin('   hello'); // 3
```

```ts
countSpaceMargin('     '); // 5
```



#### countSpaceMarginByArray

`countSpaceMarginByArray(): number[]`




Examples




#### countString

`countString(strings: string[], equalString: string, offset: number, maxOffset: number): number`

Count occurrences of a string within a subarray of strings.

Counts how many times `equalString` appears in the `strings` array
between index `offset` (inclusive) and `maxOffset` (exclusive).

Examples
```ts
countString(['a', 'b', 'a', 'c'], 'a', 0, 4); // 2
```

```ts
countString(['hello', 'world', 'hello'], 'hello', 1, 3); // 1
```

```ts
countString(['x', 'y', 'z'], 'w', 0, 3); // 0
```



#### create

`create(value: unknown): string`

Convert any value to a string.



Examples
```ts
string(100); // 100
```

```ts
string(true); // true
```

```ts
string(null); // null
```



#### escapeByString

`escapeByString(): string`




Examples




#### getWords

`getWords(value: string): string[]`

Splits string into an array of its words.



Examples
```ts
getWords('fred, barney, & pebbles'); // [fred, barney, pebbles]
```

```ts
getWords('camelCase'); // [camel, Case]
```

```ts
getWords('nested_snake_case'); // [nested, snake, case]
```



#### indentLines

`indentLines(): string`




Examples




#### isEndsWith

`isEndsWith(text: string, target: string, position: number | undefined): boolean`

Checks if string ends with the given target string.



Examples
```ts
isEndsWith('abc', 'c'); // true
```

```ts
isEndsWith('abc', 'b'); // false
```

```ts
isEndsWith('abc', 'b', 2); // true
```



#### isEndsWithAny

`isEndsWithAny(text: string, targets: string[], position: number | undefined): boolean`

Checks if string ends with any of the given target strings.



Examples
```ts
isEndsWithAny('image.jpg', ['.jpg', '.png']); // true
```

```ts
isEndsWithAny('image.gif', ['.jpg', '.png']); // false
```

```ts
isEndsWithAny('abc', ['a', 'b'], 2); // true
```



#### isNullOrEmpty

`isNullOrEmpty(str: string | null | undefined): boolean`

Check if the string is null, undefined, or empty (including whitespace).



Examples
```ts
isNullOrEmpty(null); // true
```

```ts
isNullOrEmpty('   '); // true
```

```ts
isNullOrEmpty('razomy'); // false
```



#### isStartsWith

`isStartsWith(string: string, target: string, position: number): boolean`

Checks if string starts with the given target string.



Examples
```ts
isStartsWith('razomy', 'r'); // true
```

```ts
isStartsWith('razomy', 'z'); // false
```

```ts
isStartsWith('razomy', 'z', 2); // true
```



#### isString

`isString(value: unknown): boolean`

Check if the value is a string.



Examples
```ts
isString('razomy'); // true
```

```ts
isString(123); // false
```

```ts
isString(null); // false
```



#### join

`join(items: string[], separator: string): string`

Joins an array of strings into a single string using a separator.



Examples
```ts
join(['a', 'b', 'c'], '-'); // a-b-c
```

```ts
join(['hello', 'world'], ' '); // hello world
```

```ts
join(['one'], ','); // one
```



#### levenshteinDistance

`levenshteinDistance(a: string, b: string): number`

Calculates the Levenshtein distance between two strings using the iterative approach with memory optimization.



Examples
```ts
levenshteinDistance('kitten', 'sitting'); // 3
```

```ts
levenshteinDistance('test', 'text'); // 1
```

```ts
levenshteinDistance('razomy', 'razomy'); // 0
```



#### merge

`merge(): string`




Examples




#### padEnd

`padEnd(input: string, length: number, chars: string): string`

Pads the end of a string with a given string (repeated, if needed) so that the resulting string reaches a given length.



Examples
```ts
padEnd('abc', 6); // abc
```

```ts
padEnd('abc', 6, '0'); // abc000
```

```ts
padEnd('abc', 2); // abc
```



#### padStart

`padStart(input: string, length: number, chars: string): string`

Pads the start of a string with another string until it reaches the given length.



Examples
```ts
padStart('a', 3); // a
```

```ts
padStart('a', 3, '0'); // 00a
```

```ts
padStart('abc', 2); // abc
```



#### prefixLines

`prefixLines(text: string, prefix: string): string`

Add margin to every line of the string.



Examples
```ts
prefixLines('Hello', '  '); // Hello
```

```ts
prefixLines('Line 1\nLine 2', '> '); // > Line 1\n> Line 2
```

```ts
prefixLines('Code', '\t'); // \tCode
```



#### removeIndex

`removeIndex(string: string, index: number, length: number): string`

Remove characters from a string at a given index.

Removes a specified number of characters from a string starting at the given index, returning the resulting string.

Examples
```ts
removeIndex('hello', 1, 1); // hllo
```

```ts
removeIndex('abcdef', 2, 3); // abf
```

```ts
removeIndex('world', 0, 2); // rld
```



#### repeat

`repeat(content: string, count: number): string`

Repeats a string a specified number of times.



Examples
```ts
repeat('a', 3); // aaa
```

```ts
repeat('razomy', 2); // razomyrazomy
```

```ts
repeat('test', 0); // 
```



#### replace

`replace(): string`




Examples




#### similarity

`similarity(): number`




Examples




#### split

`split(text: string, splitter: string | RegExp, limit: number | undefined): string[]`

Split string by splitter characters.



Examples
```ts
split('Line 1\nLine 2', '\n'); // [Line 1, Line 2]
```

```ts
split('A\nB\nC', /[\n]/); // [A, B, C]
```

```ts
split('One', ''); // [O,n,e]
```



#### splitLines

`splitLines(text: string): string[]`

Split string by newline characters.



Examples
```ts
splitLines('Line 1\nLine 2'); // [Line 1, Line 2]
```

```ts
splitLines('A\r\nB\nC'); // [A, B, C]
```

```ts
splitLines('One'); // [One]
```



#### stripTags

`stripTags(content: string): string`

Strip HTML tags from a string.



Examples
```ts
stripTags('<p>Hello world</p>'); // Hello world
```

```ts
stripTags('<a href="https://example.com">Link</a>'); // Link
```

```ts
stripTags('<div><span>content</span></div>'); // content
```



#### takeAfter

`takeAfter(text: string, separator: string): string`

Get the substring after the first occurrence of a separator.



Examples
```ts
takeAfter('foo.bar', '.'); // bar
```

```ts
takeAfter('foo.bar.baz', '.bar.'); // baz
```

```ts
takeAfter('foo', ','); // foo
```



#### takeBefore

`takeBefore(text: string, separator: string): string`

Gets the substring before the first occurrence of a separator.



Examples
```ts
takeBefore('@razomy/string', '.'); // razomy
```

```ts
takeBefore('user@example.com', '@'); // user
```

```ts
takeBefore('atomic', ' '); // atomic
```



#### takeBetween

`takeBetween(text: string, start: string, end: string): string`

Extracts a substring found between a start string and an end string.



Examples
```ts
takeBetween('The quick brown fox', 'quick ', ' fox'); // brown
```

```ts
takeBetween('key="value";', '"', '"'); // value
```

```ts
takeBetween('<div>content</div>', '<div>', '</div>'); // content
```



#### toBuffer

`toBuffer(value: string, encoding: BufferEncoding): Buffer<ArrayBufferLike>`

Convert string to buffer using specified encoding.



Examples
```ts
toBuffer('abc', 'utf8'); // <Buffer 61 62 63>
```

```ts
toBuffer('YWJj', 'base64'); // <Buffer 61 62 63>
```

```ts
toBuffer('616263', 'hex'); // <Buffer 61 62 63>
```



#### trim

`trim(text: string): string`

Removes whitespace from both ends of the string.



Examples
```ts
trim('  foo  '); // foo
```

```ts
trim('\nbar\t'); // bar
```

```ts
trim('   '); // 
```



#### truncate

`truncate(text: string, length: number, omission: string): string`

Truncates string if it's longer than the given maximum string length.



Examples
```ts
truncate('hello world', 5); // he...
```

```ts
truncate('hello', 10); // hello
```

```ts
truncate('hello world', 7, '...'); // hello...
```



#### unescapeByString

`unescapeByString(): string`




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

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:
- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).