// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
import * as stringCase from '@razomy/string-case';

// --- RUNTIME BINDINGS ---
if (!String.prototype.abbreviation) {
  Object.defineProperty(String.prototype, 'abbreviation', {
    value: function (...args: any[]) {
      return (stringCase as any).abbreviation(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.alternatingCase) {
  Object.defineProperty(String.prototype, 'alternatingCase', {
    value: function (...args: any[]) {
      return (stringCase as any).alternatingCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.camelCase) {
  Object.defineProperty(String.prototype, 'camelCase', {
    value: function (...args: any[]) {
      return (stringCase as any).camelCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.capitalize) {
  Object.defineProperty(String.prototype, 'capitalize', {
    value: function (...args: any[]) {
      return (stringCase as any).capitalize(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.constantCase) {
  Object.defineProperty(String.prototype, 'constantCase', {
    value: function (...args: any[]) {
      return (stringCase as any).constantCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.dotCase) {
  Object.defineProperty(String.prototype, 'dotCase', {
    value: function (...args: any[]) {
      return (stringCase as any).dotCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.headerCase) {
  Object.defineProperty(String.prototype, 'headerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).headerCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.humanize) {
  Object.defineProperty(String.prototype, 'humanize', {
    value: function (...args: any[]) {
      return (stringCase as any).humanize(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.isAlpha) {
  Object.defineProperty(String.prototype, 'isAlpha', {
    value: function (...args: any[]) {
      return (stringCase as any).isAlpha(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.isAlphanumeric) {
  Object.defineProperty(String.prototype, 'isAlphanumeric', {
    value: function (...args: any[]) {
      return (stringCase as any).isAlphanumeric(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.isLowerCase) {
  Object.defineProperty(String.prototype, 'isLowerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).isLowerCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.isUpperCase) {
  Object.defineProperty(String.prototype, 'isUpperCase', {
    value: function (...args: any[]) {
      return (stringCase as any).isUpperCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.kebabCase) {
  Object.defineProperty(String.prototype, 'kebabCase', {
    value: function (...args: any[]) {
      return (stringCase as any).kebabCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.lowerCase) {
  Object.defineProperty(String.prototype, 'lowerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).lowerCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.pascalCase) {
  Object.defineProperty(String.prototype, 'pascalCase', {
    value: function (...args: any[]) {
      return (stringCase as any).pascalCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.pathCase) {
  Object.defineProperty(String.prototype, 'pathCase', {
    value: function (...args: any[]) {
      return (stringCase as any).pathCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.reverse) {
  Object.defineProperty(String.prototype, 'reverse', {
    value: function (...args: any[]) {
      return (stringCase as any).reverse(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.sentenceCase) {
  Object.defineProperty(String.prototype, 'sentenceCase', {
    value: function (...args: any[]) {
      return (stringCase as any).sentenceCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.slugify) {
  Object.defineProperty(String.prototype, 'slugify', {
    value: function (...args: any[]) {
      return (stringCase as any).slugify(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.snakeCase) {
  Object.defineProperty(String.prototype, 'snakeCase', {
    value: function (...args: any[]) {
      return (stringCase as any).snakeCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.swapCase) {
  Object.defineProperty(String.prototype, 'swapCase', {
    value: function (...args: any[]) {
      return (stringCase as any).swapCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.titleCase) {
  Object.defineProperty(String.prototype, 'titleCase', {
    value: function (...args: any[]) {
      return (stringCase as any).titleCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

if (!String.prototype.upperCase) {
  Object.defineProperty(String.prototype, 'upperCase', {
    value: function (...args: any[]) {
      return (stringCase as any).upperCase(this as any, ...args);
    },
    writable: true,
    configurable: true,
  });
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface String {
    /**
     * @summary Get abbreviation from string.
     * @description Takes a string of words separated by spaces, hyphens, or underscores,
     * and returns an abbreviation formed by concatenating the first letter of each word.
     * @param text The full name string.
     * @returns The abbreviation formed by the first letter of each word.
     * @example
     * ```ts
     * abbreviation('Hello World'); // => 'HW'
     * ```
     * @example
     * ```ts
     * abbreviation('node package manager'); // => 'npm'
     * ```
     * @example
     * ```ts
     * abbreviation('Read-Only_Memory'); // => 'ROM'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    abbreviation(this: string): string;
    /**
     * @summary Convert string to aLtErNaTiNg cAsE (SpongeBob case).
     * @description Alternates cases based on the index of the character (ignoring spaces is optional, this implementation alternates strictly by character position).
     * @param text The text to convert.
     * @returns The alternating cased string.
     * @example
     * ```ts
     * alternatingCase('hello world'); // => 'hElLo wOrLd'
     * ```
     * @example
     * ```ts
     * alternatingCase('typescript'); // => 'tYpEsCrIpT'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    alternatingCase(this: string): string;
    /**
     * @summary Converts a string to camel case.
     * @description Takes an input string in any common format (space-separated, kebab-case, snake_case, PascalCase, etc.)
     * and converts it to camelCase. The function first normalizes the string by identifying word boundaries
     * (including transitions between acronyms, letters/numbers, and common delimiters like spaces, hyphens, dots, and underscores),
     * then joins the segments together with the first segment in lowercase and each subsequent segment capitalized.
     * @param text - The text to convert.
     * @returns The camel cased string.
     * @example
     * ```ts
     * camelCase('Foo Bar'); // => 'fooBar'
     * ```
     * @example
     * ```ts
     * camelCase('--foo-bar--'); // => 'fooBar'
     * ```
     * @example
     * ```ts
     * camelCase('__FOO_BAR__'); // => 'fooBar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    camelCase(this: string): string;
    /**
     * @summary Converts the first character of string to upper case and the remaining to lower case.
     * @description Takes an input string and returns a new string where the first character is converted to upper case and all remaining characters are converted to lower case. This is useful for normalizing the casing of words regardless of their original casing.
     * @param text The string to capitalize.
     * @returns The capitalized string.
     * @example
     * ```ts
     * capitalize('razomy'); // => 'Razomy'
     * ```
     * @example
     * ```ts
     * capitalize('RAZOMY'); // => 'Razomy'
     * ```
     * @example
     * ```ts
     * capitalize('rAZOMY'); // => 'Razomy'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    capitalize(this: string): string;
    /**
     * @summary Convert string to CONSTANT_CASE (macro case).
     * @description Converts a given string from any common casing convention (camelCase, kebab-case,
     * snake_case, space-separated, etc.) to CONSTANT_CASE (also known as macro case or screaming snake case),
     * where all letters are uppercased and words are separated by underscores.
     * @param text The text to convert.
     * @returns The constant cased string.
     * @example
     * ```ts
     * constantCase('hello world'); // => 'HELLO_WORLD'
     * ```
     * @example
     * ```ts
     * constantCase('camelCaseString'); // => 'CAMEL_CASE_STRING'
     * ```
     * @example
     * ```ts
     * constantCase('kebab-case-test'); // => 'KEBAB_CASE_TEST'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    constantCase(this: string): string;
    /**
     * @summary Convert string to dot.case.
     * @description Converts a given string into dot.case format by splitting the input on
     * camelCase boundaries, non-alphanumeric characters, and whitespace, then joining
     * the resulting lowercase words with dots.
     * @param text The text to convert.
     * @returns The dot cased string.
     * @example
     * ```ts
     * dotCase('Hello World'); // => 'hello.world'
     * ```
     * @example
     * ```ts
     * dotCase('camelCaseString'); // => 'camel.case.string'
     * ```
     * @example
     * ```ts
     * dotCase('foo_bar'); // => 'foo.bar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    dotCase(this: string): string;
    /**
     * @summary Convert string to Header-Case (Train-Case).
     * @description Converts a given string into Header-Case (also known as Train-Case), where each word is capitalized
     * and separated by hyphens. The function handles various input formats including camelCase, snake_case,
     * and strings with arbitrary delimiters by first splitting the text into individual words, capitalizing
     * the first letter of each word, lowercasing the rest, and then joining them with hyphens.
     * @param text The text to convert.
     * @returns The header cased string.
     * @example
     * ```ts
     * headerCase('hello world'); // => 'Hello-World'
     * ```
     * @example
     * ```ts
     * headerCase('camelCaseString'); // => 'Camel-Case-String'
     * ```
     * @example
     * ```ts
     * headerCase('session_id'); // => 'Session-Id'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    headerCase(this: string): string;
    /**
     * @summary Convert a string to a human-readable form.
     * @description Transforms a string from common programming naming conventions (camelCase, snake_case, kebab-case)
     * into a human-readable sentence. It splits words by detecting camelCase boundaries, underscores, and hyphens,
     * normalizes whitespace, converts the result to lowercase, and capitalizes the first letter.
     * @param text The string to humanize.
     * @returns The humanized string.
     * @example
     * ```ts
     * humanize('camelCase'); // => 'Camel case'
     * ```
     * @example
     * ```ts
     * humanize('snake_case_string'); // => 'Snake case string'
     * ```
     * @example
     * ```ts
     * humanize('kebab-case-string'); // => 'Kebab case string'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    humanize(this: string): string;
    /**
     * @summary Checks if the string contains only alphabetic characters.
     * @description Determines whether the given string consists exclusively of alphabetic characters (a-z, A-Z). Returns `false` for empty strings, strings containing digits, whitespace, special characters, or any non-alphabetic characters. The check is performed using a regular expression that matches one or more alphabetic characters spanning the entire string.
     * @param text The string to check.
     * @returns True if the string is alphabetic.
     * @example
     * ```ts
     * isAlpha('Razomy'); // => true
     * ```
     * @example
     * ```ts
     * isAlpha('R4zomy'); // => false
     * ```
     * @example
     * ```ts
     * isAlpha(''); // => false
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    isAlpha(this: string): boolean;
    /**
     * @summary Check if the string contains only alphanumeric characters.
     * @description Tests whether the given string consists exclusively of alphanumeric characters (letters a-z, A-Z and digits 0-9) using a regular expression. Returns false for empty strings, strings containing spaces, special characters, or any non-alphanumeric content.
     * @param text The text to check.
     * @returns True if the string is alphanumeric.
     * @example
     * ```ts
     * isAlphanumeric('Razomy1'); // => true
     * ```
     * @example
     * ```ts
     * isAlphanumeric('Razomy-String'); // => false
     * ```
     * @example
     * ```ts
     * isAlphanumeric(' '); // => false
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    isAlphanumeric(this: string): boolean;
    /**
     * @summary Checks if the string is lower case.
     * @description Determines whether the entire input string is in lower case by comparing it to its lower-cased equivalent. Non-alphabetic characters (such as digits, spaces, and symbols) do not affect the result, as they have no case and remain unchanged by the lower case conversion.
     * @param text The string to check.
     * @returns True if the string is lower case, false otherwise.
     * @example
     * ```ts
     * isLowerCase('razomy'); // => true
     * ```
     * @example
     * ```ts
     * isLowerCase('Razomy'); // => false
     * ```
     * @example
     * ```ts
     * isLowerCase('string with 123'); // => true
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    isLowerCase(this: string): boolean;
    /**
     * @summary Check if a string is upper case.
     * @description Determines whether the given string is entirely in upper case by comparing it to its upper-cased transformation. Returns true only if every character in the string is already upper case (i.e., the string is identical to the result of calling `toUpperCase()` on it).
     * @param text The string to check.
     * @returns True if the string is upper case.
     * @example
     * ```ts
     * isUpperCase('HELLO'); // => true
     * ```
     * @example
     * ```ts
     * isUpperCase('Hello'); // => false
     * ```
     * @example
     * ```ts
     * isUpperCase('hello'); // => false
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    isUpperCase(this: string): boolean;
    /**
     * @summary Convert string to kebab case.
     * @description Converts a given string to kebab-case by handling acronyms, camelCase, letter-number boundaries,
     * and various delimiters (spaces, underscores, hyphens, dots). Leading and trailing separators are stripped,
     * and the result is lowercased.
     * @param text The text to convert.
     * @returns The kebab cased string.
     * @example
     * ```ts
     * kebabCase('fooBar'); // => 'foo-bar'
     * ```
     * @example
     * ```ts
     * kebabCase('Foo Bar'); // => 'foo-bar'
     * ```
     * @example
     * ```ts
     * kebabCase('__FOO_BAR__'); // => 'foo-bar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    kebabCase(this: string): string;
    /**
     * @summary Converts a string to lower case.
     * @description Converts all characters in the given string to their lower case equivalents using the built-in `toLowerCase` method. The original string is not modified; a new lower cased string is returned.
     * @param text - The string to convert.
     * @returns The lower cased string.
     * @example
     * ```ts
     * lowerCase('RAZOMY'); // => 'razomy'
     * ```
     * @example
     * ```ts
     * lowerCase('Test'); // => 'test'
     * ```
     * @example
     * ```ts
     * lowerCase('FOO Bar'); // => 'foo bar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    lowerCase(this: string): string;
    /**
     * @summary Convert string to pascal case.
     * @description Converts a given string to PascalCase by splitting it into words
     * (handling spaces, underscores, and camelCase/UPPERCASE boundaries),
     * capitalizing the first letter of each word, lowercasing the rest,
     * and joining them together without any separator.
     * @param text The string.
     * @returns The pascal cased string.
     * @example
     * ```ts
     * pascalCase('foo bar'); // => 'FooBar'
     * ```
     * @example
     * ```ts
     * pascalCase('foo_bar'); // => 'FooBar'
     * ```
     * @example
     * ```ts
     * pascalCase('FOO BAR'); // => 'FooBar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    pascalCase(this: string): string;
    /**
     * @summary Convert string to path/case.
     * @description Converts a given string into path/case format by splitting it on camelCase boundaries,
     * non-alphanumeric characters, and whitespace, then joining the resulting lowercase words with forward slashes.
     * @param text The text to convert.
     * @returns The path cased string.
     * @example
     * ```ts
     * pathCase('Hello World'); // => 'hello/world'
     * ```
     * @example
     * ```ts
     * pathCase('camelCaseString'); // => 'camel/case/string'
     * ```
     * @example
     * ```ts
     * pathCase('foo_bar'); // => 'foo/bar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    pathCase(this: string): string;
    /**
     * @summary Reverses the given string.
     * @description Reverses the order of characters in the given string by spreading it into an array of individual characters,
     * reversing the array, and joining the characters back into a string. This approach correctly handles multi-byte
     * Unicode characters (such as emojis) by using the spread operator, which splits on code points rather than code units.
     * @param text The string to reverse.
     * @returns The reversed string.
     * @example
     * ```ts
     * reverse('abc'); // => 'cba'
     * ```
     * @example
     * ```ts
     * reverse('qwerty'); // => 'ytrewq'
     * ```
     * @example
     * ```ts
     * reverse('123'); // => '321'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    reverse(this: string): string;
    /**
     * @summary Convert string to Sentence case.
     * @description Only the first letter of the result is capitalized, the rest is lowercase.
     * @param text The text to convert.
     * @returns The sentence cased string.
     * @example
     * ```ts
     * sentenceCase('helloWorld'); // => 'Hello world'
     * ```
     * @example
     * ```ts
     * sentenceCase('HELLO WORLD'); // => 'Hello world'
     * ```
     * @example
     * ```ts
     * sentenceCase('foo_bar_baz'); // => 'Foo bar baz'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    sentenceCase(this: string): string;
    /**
     * @summary Convert string to url friendly slug.
     * @description Converts a given string into a URL-friendly slug by normalizing unicode characters
     * (removing diacritics/accents), converting to lowercase, replacing non-alphanumeric characters
     * with hyphens, and trimming leading/trailing hyphens.
     * @param text The text to slugify.
     * @returns The slugified string.
     * @example
     * ```ts
     * slugify('Hello World'); // => 'hello-world'
     * ```
     * @example
     * ```ts
     * slugify('Foo & Bar'); // => 'foo-bar'
     * ```
     * @example
     * ```ts
     * slugify('Crème Brûlée'); // => 'creme-brulee'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    slugify(this: string): string;
    /**
     * @summary Convert string to snake case.
     * @description Converts a given string to snake_case format by handling acronyms, camelCase,
     * letter-to-number and number-to-letter boundaries, and replacing common delimiters
     * (spaces, hyphens, dots) with underscores. The result is trimmed of leading/trailing
     * underscores and converted to lowercase.
     * @param text The string to convert.
     * @returns The snake cased string.
     * @example
     * ```ts
     * snakeCase('fooBar'); // => 'foo_bar'
     * ```
     * @example
     * ```ts
     * snakeCase('Foo Bar'); // => 'foo_bar'
     * ```
     * @example
     * ```ts
     * snakeCase('FOO-BAR'); // => 'foo_bar'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    snakeCase(this: string): string;
    /**
     * @summary Convert string by swapping the case of every character.
     * @description Uppercase becomes lowercase, and lowercase becomes uppercase.
     * @param text The text to convert.
     * @returns The swapped case string.
     * @example
     * ```ts
     * swapCase('Hello World'); // => 'hELLO wORLD'
     * ```
     * @example
     * ```ts
     * swapCase('camelCase'); // => 'CAMELcASE'
     * ```
     * @example
     * ```ts
     * swapCase('123 ABC xyz'); // => '123 abc XYZ'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    swapCase(this: string): string;
    /**
     * @summary Convert string to title case.
     * @description Converts the input string to title case by first lowercasing the entire string,
     * then capitalizing the first letter of each word. Word boundaries are determined by the `\b`
     * regex anchor, so hyphenated words and other non-alphabetic separators only trigger
     * capitalization at the start of each word boundary segment.
     * @param text The input string.
     * @returns The title cased string.
     * @example
     * ```ts
     * titleCase('foo bar'); // => 'Foo Bar'
     * ```
     * @example
     * ```ts
     * titleCase('HELLO WORLD'); // => 'Hello World'
     * ```
     * @example
     * ```ts
     * titleCase('one-two'); // => 'One-two'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    titleCase(this: string): string;
    /**
     * @summary Convert string to upper case.
     * @description Converts all characters in the given string to their upper-case equivalents using the built-in `String.prototype.toUpperCase` method. The original string is not modified; a new upper-cased string is returned.
     * @param text The input string.
     * @returns The upper-cased string.
     * @example
     * ```ts
     * upperCase('test'); // => 'TEST'
     * ```
     * @example
     * ```ts
     * upperCase('Hello World'); // => 'HELLO WORLD'
     * ```
     * @example
     * ```ts
     * upperCase('razomy'); // => 'RAZOMY'
     * ```
     * @complexity time O(n)
     * @complexity memory O(n)
     */
    upperCase(this: string): string;
  }
}
export {};
