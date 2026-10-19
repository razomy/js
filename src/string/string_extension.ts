// AUTO-GENERATED CLASS FILE. DO NOT EDIT DIRECTLY. By /src/ts-refactor/generate_all_extensions.ts.
import * as string from '@razomy/string';
import * as abstractions from '@razomy/abstractions';

export class StringExtension {
  /**
   * @summary Insert a string into another string at a specific index.
   * @description Inserts a string into another string at a specified index.
   * @param text The original string where the insertion will occur.
   * @param index The zero-based index at which to insert the new string.
   * @param insertion The string to be inserted into the original string.
   * @returns The resulting string after the insertion.
   * @example
   * ```ts
   * addByIndexString('-text', 0, 'prefix'); // => 'prefix-text'
   * ```
   * @example
   * ```ts
   * addByIndexString('hello ', 6, 'world'); // => 'hello world'
   * ```
   * @example
   * ```ts
   * addByIndexString('foo baz', 4, 'bar '); // => 'foo bar baz'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public addByIndexString(this: string, index: abstractions.array.Index, insertion: string): string {
    return string.addByIndexString(this, index, insertion);
  }

  /**
   * @summary Split string into chunks by maximum byte length.
   * @description Iterates over Unicode characters and groups them into chunks ensuring that each chunk's UTF-8 byte size does not exceed the specified maximum bytes.
   * @param text The input string to chunk.
   * @param maxBytes The maximum allowed byte size per chunk. Defaults to 700.
   * @returns An array of string chunks.
   * @example
   * ```ts
   * chunkByByteLength('Hello', 2); // => ['He', 'll', 'o']
   * ```
   * @example
   * ```ts
   * chunkByByteLength('a👋b', 5); // => ['a👋', 'b']
   * ```
   * @example
   * ```ts
   * chunkByByteLength('こんにちは', 6); // => ['こん', 'にち', 'は']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public chunkByByteLength(this: string, maxBytes?: number): string[] {
    return string.chunkByByteLength(this, maxBytes);
  }

  /**
   * @summary Splits a string into an array of chunks.
   * @description Divides a string into an array of smaller strings, each of a specified maximum length.
   * @param text The string to chunk.
   * @param size The maximum length of each chunk.
   * @returns The array of string chunks.
   * @throws {RangeError} When size is less than or equal to zero.
   * @example
   * ```ts
   * chunk('12345', 2); // => ['12', '34', '5']
   * ```
   * @example
   * ```ts
   * chunk('hello', 1); // => ['h', 'e', 'l', 'l', 'o']
   * ```
   * @example
   * ```ts
   * chunk('abc', 5); // => ['abc']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public chunk(this: string, size: number): string[] {
    return string.chunk(this, size);
  }

  /**
   * @summary Checks if a string contains any of the specified substrings.
   * @description Checks if the input string contains at least one of the substrings provided in the search array.
   * @param text The main string to inspect.
   * @param search An array of strings to search for within the text.
   * @returns True if the string contains at least one of the search substrings, false otherwise.
   * @example
   * ```ts
   * containsAny('razomy', ['zo']); // => true
   * ```
   * @example
   * ```ts
   * containsAny('razomy', ['bar']); // => false
   * ```
   * @example
   * ```ts
   * containsAny('hello world', ['hello']); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public containsAny(this: string, search: string[]): boolean {
    return string.containsAny(this, search);
  }

  /**
   * @summary Checks if a string contains a specific substring.
   * @description Checks if a string contains a specific substring.
   * @param text The string to inspect.
   * @param search The substring to search for.
   * @returns True if the string contains the substring, false otherwise.
   * @example
   * ```ts
   * contains('razomy', 'zo'); // => true
   * ```
   * @example
   * ```ts
   * contains('razomy', 'bar'); // => false
   * ```
   * @example
   * ```ts
   * contains('hello world', 'hello'); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public contains(this: string, search: string): boolean {
    return string.contains(this, search);
  }

  /**
   * @summary Count occurrences of a char at string within a range.
   * @description Counts how many times `equalChar` appears in the `string`
   * between index `offset` (inclusive) and `maxOffset` (exclusive).
   * @param string The string to search within.
   * @param equalChar The single character to match against.
   * @param offset The starting index (inclusive).
   * @param maxOffset The ending index (exclusive).
   * @returns The number of occurrences found.
   * @example
   * ```ts
   * countChar('abac', 'a', 0, 4); // => 2
   * ```
   * @example
   * ```ts
   * countChar('helloworldhello', 'h', 0, 3); // => 1
   * ```
   * @example
   * ```ts
   * countChar(['xyz', 'w', 0, 3); // => 0
   * ```
   * @complexity time O(maxOffset - offset)
   * @complexity memory O(1)
   */
  public countChar(this: string, equalChar: string, offset: number, maxOffset: number): number {
    return string.countChar(this, equalChar, offset, maxOffset);
  }

  /**
   * @summary Counts the number of non-overlapping occurrences of a substring within a text.
   * @description Counts the number of non-overlapping occurrences of a substring within a text.
   * @param text The main string to search within.
   * @param substring The substring to count occurrences of.
   * @returns {number} The total number of times the substring appears in the text.
   * @example
   * ```ts
   * countOccurrences('hello world', 'l'); // => 3
   * ```
   * @example
   * ```ts
   * countOccurrences('aaaa', 'aa'); // => 2
   * ```
   * @example
   * ```ts
   * countOccurrences('apple', 'z'); // => 0
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public countOccurrences(this: string, substring: string): number {
    return string.countOccurrences(this, substring);
  }

  /**
   * @summary Count leading space margin of a string.
   * @description Counts the number of leading space characters before the first non-space character in a string.
   * @param string The input string to count the leading spaces of.
   * @returns The number of leading space characters.
   * @example
   * ```ts
   * countSpaceMargin('hello'); // => 0
   * ```
   * @example
   * ```ts
   * countSpaceMargin('   hello'); // => 3
   * ```
   * @example
   * ```ts
   * countSpaceMargin('     '); // => 5
   * ```
   * @complexity time O(n)
   * @complexity memory O(1)
   */
  public countSpaceMargin(this: string): number {
    return string.countSpaceMargin(this);
  }

  /**
   * @summary Escapes all occurrences of a separator within a string.
   * @description Inserts a backslash character before every instance of the specified separator substring.
   * @param string The target string to be escaped.
   * @param separator The substring that needs to be escaped.
   * @returns The escaped string.
   * @example
   * ```ts
   * escapeByString('a.b.c', '.'); // => 'a\\.b\\.c'
   * ```
   * @example
   * ```ts
   * escapeByString('foo"bar', '"'); // => 'foo\\"bar'
   * ```
   * @example
   * ```ts
   * escapeByString('hello', '-'); // => 'hello'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public escapeByString(this: string, separator: string): string {
    return string.escapeByString(this, separator);
  }

  public getSimilar(this: string, items: any[]): string | null {
    return string.getSimilar(this, items);
  }

  /**
   * @summary Splits string into an array of its words.
   * @description Splits string into an array of its words by matching sequences of letters or numbers.
   * @param value The string to process.
   * @returns An array of words found in the string.
   * @example
   * ```ts
   * getWords('fred, barney, & pebbles'); // => ['fred', 'barney', 'pebbles']
   * ```
   * @example
   * ```ts
   * getWords('camelCase'); // => ['camel', 'Case']
   * ```
   * @example
   * ```ts
   * getWords('nested_snake_case'); // => ['nested', 'snake', 'case']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public getWords(this: string): string[] {
    return string.getWords(this);
  }

  /**
   * @summary Indent each line of a string.
   * @description Adds a specified number of space characters to the beginning of each line in a given string.
   * @param value The string to indent.
   * @param size The number of spaces to indent each line.
   * @returns The indented string.
   * @example
   * ```ts
   * indentLines('hello', 2); // => '  hello'
   * ```
   * @example
   * ```ts
   * indentLines('foo\nbar', 4); // => '    foo\n    bar'
   * ```
   * @example
   * ```ts
   * indentLines('a\nb\nc', 1); // => ' a\n b\n c'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public indentLines(this: string, size: number): string {
    return string.indentLines(this, size);
  }

  /**
   * @summary Checks if string ends with any of the given target strings.
   * @description Checks if string ends with any of the given target strings.
   * @param text The string to inspect.
   * @param targets The array of strings to search for.
   * @param position Optional position to search up to for the ending check (affects behavior of string.endsWith).
   * @returns Returns true if string ends with any of the targets, else false.
   * @example
   * ```ts
   * isEndsWithAny('image.jpg', ['.jpg', '.png']); // => true
   * ```
   * @example
   * ```ts
   * isEndsWithAny('image.gif', ['.jpg', '.png']); // => false
   * ```
   * @example
   * ```ts
   * isEndsWithAny('abc', ['a', 'b'], 2); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public isEndsWithAny(this: string, targets: string[], position?: number): boolean {
    return string.isEndsWithAny(this, targets, position);
  }

  /**
   * @summary Checks if string ends with the given target string.
   * @description Checks if string ends with the given target string.
   * @param text The string to inspect.
   * @param target The string to search for.
   * @param position Optional position to start the search from. Defaults to 0 if omitted.
   * @returns Returns true if string ends with target, else false.
   * @example
   * ```ts
   * isEndsWith('abc', 'c'); // => true
   * ```
   * @example
   * ```ts
   * isEndsWith('abc', 'b'); // => false
   * ```
   * @example
   * ```ts
   * isEndsWith('abc', 'b', 2); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public isEndsWith(this: string, target: string, position?: number): boolean {
    return string.isEndsWith(this, target, position);
  }

  /**
   * @summary Checks if string starts with the given target string.
   * @description Checks if string starts with the given target string starting from a specified position.
   * @param string The string to inspect.
   * @param target The string to search for.
   * @param position The starting index in the string to check from. Defaults to 0.
   * @returns Returns true if the substring of `string` starting at `position` starts with `target`, else false.
   * @example
   * ```ts
   * isStartsWith('razomy', 'r'); // => true
   * ```
   * @example
   * ```ts
   * isStartsWith('razomy', 'z'); // => false
   * ```
   * @example
   * ```ts
   * isStartsWith('razomy', 'z', 2); // => true
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public isStartsWith(this: string, target: string, position?: number): boolean {
    return string.isStartsWith(this, target, position);
  }

  public isStringsAnyIndex(this: string, equalStrings: Set<string>, offset?: abstractions.array.Offset, maxOffset?: abstractions.array.Offset): boolean {
    return string.isStringsAnyIndex(this, equalStrings, offset, maxOffset);
  }

  public lastIndex(this: string, equalString: string, offset?: abstractions.array.Offset, maxOffset?: abstractions.array.Offset): abstractions.array.Index {
    return string.lastIndex(this, equalString, offset, maxOffset);
  }

  /**
   * @summary Calculates the Levenshtein distance between two strings using the iterative approach with memory optimization.
   * @description Calculates the Levenshtein distance between two strings using the iterative approach with memory optimization.
   * @param a The first string.
   * @param b The second string.
   * @returns {number} The number of edits (insertions, deletions, or substitutions) required to transform one string into the other.
   * @example
   * ```ts
   * levenshteinDistance('kitten', 'sitting'); // => 3
   * ```
   * @example
   * ```ts
   * levenshteinDistance('test', 'text'); // => 1
   * ```
   * @example
   * ```ts
   * levenshteinDistance('razomy', 'razomy'); // => 0
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public levenshteinDistance(this: string, b: string): number {
    return string.levenshteinDistance(this, b);
  }

  public nextMarginIndex(this: string, equalString: string, offset?: abstractions.array.Offset, maxOffset?: abstractions.array.Offset): abstractions.array.Index {
    return string.nextMarginIndex(this, equalString, offset, maxOffset);
  }

  /**
   * @summary Pads the end of a string with a given string (repeated, if needed) so that the resulting string reaches a given length.
   * @description Pads the end of a string with a given string (repeated, if needed) so that the resulting string reaches a given length.
   * @param input The string to pad.
   * @param length The target length of the resulting string.
   * @param chars The string to pad with. Defaults to space.
   * @returns The padded string.
   * @example
   * ```ts
   * padEnd('abc', 6); // => 'abc   '
   * ```
   * @example
   * ```ts
   * padEnd('abc', 6, '0'); // => 'abc000'
   * ```
   * @example
   * ```ts
   * padEnd('abc', 2); // => 'abc'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public padEnd(this: string, length: number, chars?: string): string {
    return string.padEnd(this, length, chars);
  }

  /**
   * @summary Pads the start of a string with another string until it reaches the given length.
   * @description Pads the start of a string with another string until it reaches the given length.
   * @param input The string to pad.
   * @param length The target length of the resulting string.
   * @param chars The string to pad with. Defaults to space.
   * @returns The padded string.
   * @example
   * ```ts
   * padStart('a', 3); // => '  a'
   * ```
   * @example
   * ```ts
   * padStart('a', 3, '0'); // => '00a'
   * ```
   * @example
   * ```ts
   * padStart('abc', 2); // => 'abc'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public padStart(this: string, length: number, chars?: string): string {
    return string.padStart(this, length, chars);
  }

  /**
   * @summary Add margin to every line of the string except empty.
   * @description Adds a specified prefix to the beginning of every line in the input string.
   * @param text The input string to be prefixed.
   * @param prefix The string to prepend to the beginning of each line.
   * @returns The string with the prefix applied to every line.
   * @example
   * ```ts
   * prefixLinesAndSkipEmpty('Hello', '  '); // => '  Hello'
   * ```
   * @example
   * ```ts
   * prefixLinesAndSkipEmpty('Line 1\n\nLine 2', '> '); // => '> Line 1\n\n> Line 2'
   * ```
   * @example
   * ```ts
   * prefixLinesAndSkipEmpty('Code', '\t'); // => '\tCode'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public prefixLinesAndSkipEmpty(this: string, prefix: string): string {
    return string.prefixLinesAndSkipEmpty(this, prefix);
  }

  /**
   * @summary Add margin to every line of the string.
   * @description Adds a specified prefix to the beginning of every line in the input string.
   * @param text The input string to be prefixed.
   * @param prefix The string to prepend to the beginning of each line.
   * @returns The string with the prefix applied to every line.
   * @example
   * ```ts
   * prefixLines('Hello', '  '); // => '  Hello'
   * ```
   * @example
   * ```ts
   * prefixLines('Line 1\nLine 2', '> '); // => '> Line 1\n> Line 2'
   * ```
   * @example
   * ```ts
   * prefixLines('Code', '\t'); // => '\tCode'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public prefixLines(this: string, prefix: string): string {
    return string.prefixLines(this, prefix);
  }

  /**
   * @summary Remove characters from a string at a given index.
   * @description Removes a specified number of characters from a string starting at the given index, returning the resulting string.
   * @param string The source string.
   * @param index The starting index from which to remove characters.
   * @param length The number of characters to remove.
   * @returns A new string with the specified characters removed.
   * @example
   * ```ts
   * removeIndex('hello', 1, 1); // => 'hllo'
   * ```
   * @example
   * ```ts
   * removeIndex('abcdef', 2, 3); // => 'abf'
   * ```
   * @example
   * ```ts
   * removeIndex('world', 0, 2); // => 'rld'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public removeIndex(this: string, index: number, length: number): string {
    return string.removeIndex(this, index, length);
  }

  /**
   * @summary Repeats a string a specified number of times.
   * @description Repeats a string a specified number of times.
   * @param content The string to repeat.
   * @param count The number of times to repeat the string. Must be a non-negative number.
   * @returns A new string containing the specified number of copies.
   * @example
   * ```ts
   * repeat('a', 3); // => 'aaa'
   * ```
   * @example
   * ```ts
   * repeat('razomy', 2); // => 'razomyrazomy'
   * ```
   * @example
   * ```ts
   * repeat('test', 0); // => ''
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public repeat(this: string, count: number): string {
    return string.repeat(this, count);
  }

  /**
   * @summary Replace all occurrences of a separator in a string.
   * @description Replace all occurrences of a separator string with a replacement string.
   * @param text The input string.
   * @param separator The substring to be replaced.
   * @param replacement The string to replace the separator with.
   * @returns The newly formatted string.
   * @example
   * ```ts
   * replace('hello world', 'world', 'there'); // => 'hello there'
   * ```
   * @example
   * ```ts
   * replace('a-b-c-d', '-', '_'); // => 'a_b_c_d'
   * ```
   * @example
   * ```ts
   * replace('foo', 'bar', 'baz'); // => 'foo'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public replace(this: string, separator: string, replacement: string): string {
    return string.replace(this, separator, replacement);
  }

  /**
   * @summary Calculate the similarity ratio between two strings.
   * @description Computes a similarity score between 0 and 1 for two strings based on their Levenshtein distance. A score of 1 indicates identical strings, while 0 indicates no commonality.
   * @param str1 The first string to compare.
   * @param str2 The second string to compare.
   * @returns A number between 0 and 1 representing the similarity ratio.
   * @example
   * ```ts
   * similarity('hello', 'hello'); // => 1
   * ```
   * @example
   * ```ts
   * similarity('hello', 'hallo'); // => 0.8
   * ```
   * @example
   * ```ts
   * similarity('test', ''); // => 0
   * ```
   * @complexity time O(n * m)
   * @complexity memory O(n * m)
   */
  public similarity(this: string, str2: string): number {
    return string.similarity(this, str2);
  }

  /**
   * @summary Split string by newline characters.
   * @description Split string by newline characters.
   * @param text The string to split.
   * @returns An array of lines.
   * @example
   * ```ts
   * splitLines('Line 1\nLine 2'); // => ['Line 1', 'Line 2']
   * ```
   * @example
   * ```ts
   * splitLines('A\r\nB\nC'); // => ['A', 'B', 'C']
   * ```
   * @example
   * ```ts
   * splitLines('One'); // => ['One']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public splitLines(this: string): string[] {
    return string.splitLines(this);
  }

  /**
   * @summary Split string by a given delimiter.
   * @description Splits a string based on a specified splitter (string or RegExp) and an optional limit on the number of resulting elements.
   * @param text The string to be split.
   * @param splitter The delimiter to use for splitting. Can be a string or a RegExp.
   * @param limit An optional number to limit the number of elements returned in the array.
   * @returns An array of strings resulting from the split operation.
   * @example
   * ```ts
   * split('Line 1\nLine 2', '\n'); // => ['Line 1', 'Line 2']
   * ```
   * @example
   * ```ts
   * split('A\nB\nC', /[\n]/); // => ['A', 'B', 'C']
   * ```
   * @example
   * ```ts
   * split('One', ''); // => ['O','n','e']
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public split(this: string, splitter: string | RegExp, limit?: number): string[] {
    return string.split(this, splitter, limit);
  }

  public stringsAnyIndex(this: string, chars: Set<string>, offset?: abstractions.array.Offset, maxOffset?: abstractions.array.Offset): abstractions.array.Index {
    return string.stringsAnyIndex(this, chars, offset, maxOffset);
  }

  /**
   * @summary Strip HTML tags from a string.
   * @description Removes all HTML tags from a given string.
   * @param content The input string potentially containing HTML tags.
   * @returns The string with all HTML tags removed.
   * @example
   * ```ts
   * stripTags('<p>Hello world</p>'); // => 'Hello world'
   * ```
   * @example
   * ```ts
   * stripTags('<a href="https://example.com">Link</a>'); // => 'Link'
   * ```
   * @example
   * ```ts
   * stripTags('<div><span>content</span></div>'); // => 'content'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public stripTags(this: string): string {
    return string.stripTags(this);
  }

  /**
   * @summary Get the substring after the first occurrence of a separator.
   * @description Get the substring after the first occurrence of a separator.
   * @param text The input string.
   * @param separator The separator to look for.
   * @returns The substring after the separator, or the original string if separator is not found.
   * @example
   * ```ts
   * takeAfter('foo.bar', '.'); // => 'bar'
   * ```
   * @example
   * ```ts
   * takeAfter('foo.bar.baz', '.bar.'); // => 'baz'
   * ```
   * @example
   * ```ts
   * takeAfter('foo', ','); // => 'foo'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public takeAfter(this: string, separator: string): string {
    return string.takeAfter(this, separator);
  }

  /**
   * @summary Gets the substring before the first occurrence of a separator.
   * @description Gets the substring before the first occurrence of a separator.
   * @param text The input string.
   * @param separator The string to search for.
   * @returns The substring before the separator, or the original string if the separator is not found.
   * @example
   * ```ts
   * takeBefore('@razomy/string', '.'); // => 'razomy'
   * ```
   * @example
   * ```ts
   * takeBefore('user@example.com', '@'); // => 'user'
   * ```
   * @example
   * ```ts
   * takeBefore('atomic', ' '); // => 'atomic'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public takeBefore(this: string, separator: string): string {
    return string.takeBefore(this, separator);
  }

  /**
   * @summary Extracts a substring found between a start string and an end string.
   * @description Extracts a substring found between a start string and an end string.
   * @param text The source text to search within.
   * @param start The string marking the beginning of the extraction.
   * @param end The string marking the end of the extraction.
   * @returns The extracted substring.
   * @throws Error if the start or end delimiters are not found.
   * @example
   * ```ts
   * takeBetween('The quick brown fox', 'quick ', ' fox'); // => 'brown'
   * ```
   * @example
   * ```ts
   * takeBetween('key="value";', '"', '"'); // => 'value'
   * ```
   * @example
   * ```ts
   * takeBetween('<div>content</div>', '<div>', '</div>'); // => 'content'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public takeBetween(this: string, start: string, end: string): string {
    return string.takeBetween(this, start, end);
  }

  /**
   * @summary Convert string to buffer using specified encoding.
   * @description Convert string to buffer using specified encoding.
   * @param value The string to convert.
   * @param encoding The encoding of the string.
   * @returns The resulting buffer.
   * @example
   * ```ts
   * toBuffer('abc', 'utf8'); // => <Buffer 61 62 63>
   * ```
   * @example
   * ```ts
   * toBuffer('YWJj', 'base64'); // => <Buffer 61 62 63>
   * ```
   * @example
   * ```ts
   * toBuffer('616263', 'hex'); // => <Buffer 61 62 63>
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public toBuffer(this: string, encoding: BufferEncoding): Buffer {
    return string.toBuffer(this, encoding);
  }

  /**
   * @summary Removes the smallest common leading whitespace (indent) from all lines.
   * @description Finds the minimum indentation among all non-empty lines and removes exactly that many space/tab characters from the beginning of every line.
   * @param text - The multiline string to dedent.
   * @returns The string with the common indent removed.
   * @example
   * ```ts
   * // Removes 2 spaces from all lines
   * trimIndent('  foo\n    bar\n  baz'); // => 'foo\n  bar\nbaz'
   * ```
   * @example
   * ```ts
   * // Ignores empty lines when calculating the minimum indent
   * trimIndent('    foo\n\n      bar'); // => 'foo\n\n  bar'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public trimIndent(this: string): string {
    return string.trimIndent(this);
  }

  /**
   * @summary Removes whitespace from both ends of each line in the string.
   * @description Splits the string into lines, removes whitespace from both ends of every line, and joins them back together.
   * @param text - The multiline string to process.
   * @returns The string with trimmed lines.
   * @example
   * ```ts
   * trimLines('  foo  \n  bar  '); // => 'foo\nbar'
   * ```
   * @example
   * ```ts
   * trimLines('\tline 1\r\n  line 2 \n'); // => 'line 1\nline 2\n'
   * ```
   * @example
   * ```ts
   * trimLines('   \n  '); // => '\n'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public trimLines(this: string): string {
    return string.trimLines(this);
  }

  /**
   * @summary Removes whitespace from both ends of the string.
   * @description Removes whitespace from both ends of the string.
   * @param text - The string to trim.
   * @returns The trimmed string.
   * @example
   * ```ts
   * trim('  foo  '); // => 'foo'
   * ```
   * @example
   * ```ts
   * trim('\nbar\t'); // => 'bar'
   * ```
   * @example
   * ```ts
   * trim('   '); // => ''
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public trim(this: string): string {
    return string.trim(this);
  }

  /**
   * @summary Truncates string if it's longer than the given maximum string length.
   * @description Truncates the input string to a specified length, appending an omission string if truncation occurs.
   * @param text The string to truncate.
   * @param length The maximum desired length of the resulting string (excluding the omission string).
   * @param omission The string to be appended to indicate truncation. Defaults to '...'.
   * @returns The truncated string.
   * @example
   * ```ts
   * truncate('hello world', 5); // => 'he...'
   * ```
   * @example
   * ```ts
   * truncate('hello', 10); // => 'hello'
   * ```
   * @example
   * ```ts
   * truncate('hello world', 7, '...'); // => 'hello...'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public truncate(this: string, length: number, omission?: string): string {
    return string.truncate(this, length, omission);
  }

  /**
   * @summary Unescape occurrences of a specific string.
   * @description Removes the backslash preceding the specified string globally.
   * @param string The string to process.
   * @param separateString The string to unescape.
   * @returns The unescaped string.
   * @example
   * ```ts
   * unescapeByString('foo\\"bar', '"'); // => 'foo"bar'
   * ```
   * @example
   * ```ts
   * unescapeByString('a\\*b', '*'); // => 'a*b'
   * ```
   * @example
   * ```ts
   * unescapeByString('\\.ext', '.'); // => '.ext'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public unescapeByString(this: string, separateString: string): string {
    return string.unescapeByString(this, separateString);
  }

  /**
   * @summary Extract content from a Markdown code block.
   * @description Removes surrounding Markdown code block backticks and language tags from a string, returning the inner content. If the string is not a valid Markdown code block, it returns the trimmed original string.
   * @param text The Markdown text.
   * @returns The extracted code or trimmed text.
   * @example
   * ```ts
   * unescapeMdCode('''ts\nconsole.log("hello");\n''''); // => 'console.log("hello");'
   * ```
   * @example
   * ```ts
   * unescapeMdCode(''''\nPlain text block\n''''); // => 'Plain text block'
   * ```
   * @example
   * ```ts
   * unescapeMdCode('Just normal text'); // => 'Just normal text'
   * ```
   * @complexity time O(n)
   * @complexity memory O(n)
   */
  public unescapeMdCode(this: string): string {
    return string.unescapeMdCode(this);
  }

}
