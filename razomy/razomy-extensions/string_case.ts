// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
import * as stringCase from '@razomy/string-case';

// --- RUNTIME BINDINGS ---
if (!String.prototype.abbreviation) {
  Object.defineProperty(String.prototype, 'abbreviation', {
    value: function (...args: any[]) {
      return (stringCase as any).abbreviation(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.alternatingCase) {
  Object.defineProperty(String.prototype, 'alternatingCase', {
    value: function (...args: any[]) {
      return (stringCase as any).alternatingCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.camelCase) {
  Object.defineProperty(String.prototype, 'camelCase', {
    value: function (...args: any[]) {
      return (stringCase as any).camelCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.capitalize) {
  Object.defineProperty(String.prototype, 'capitalize', {
    value: function (...args: any[]) {
      return (stringCase as any).capitalize(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.constantCase) {
  Object.defineProperty(String.prototype, 'constantCase', {
    value: function (...args: any[]) {
      return (stringCase as any).constantCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.dotCase) {
  Object.defineProperty(String.prototype, 'dotCase', {
    value: function (...args: any[]) {
      return (stringCase as any).dotCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.headerCase) {
  Object.defineProperty(String.prototype, 'headerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).headerCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.humanize) {
  Object.defineProperty(String.prototype, 'humanize', {
    value: function (...args: any[]) {
      return (stringCase as any).humanize(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.isAlpha) {
  Object.defineProperty(String.prototype, 'isAlpha', {
    value: function (...args: any[]) {
      return (stringCase as any).isAlpha(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.isAlphanumeric) {
  Object.defineProperty(String.prototype, 'isAlphanumeric', {
    value: function (...args: any[]) {
      return (stringCase as any).isAlphanumeric(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.isLowerCase) {
  Object.defineProperty(String.prototype, 'isLowerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).isLowerCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.isUpperCase) {
  Object.defineProperty(String.prototype, 'isUpperCase', {
    value: function (...args: any[]) {
      return (stringCase as any).isUpperCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.kebabCase) {
  Object.defineProperty(String.prototype, 'kebabCase', {
    value: function (...args: any[]) {
      return (stringCase as any).kebabCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.lowerCase) {
  Object.defineProperty(String.prototype, 'lowerCase', {
    value: function (...args: any[]) {
      return (stringCase as any).lowerCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.pascalCase) {
  Object.defineProperty(String.prototype, 'pascalCase', {
    value: function (...args: any[]) {
      return (stringCase as any).pascalCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.pathCase) {
  Object.defineProperty(String.prototype, 'pathCase', {
    value: function (...args: any[]) {
      return (stringCase as any).pathCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.reverse) {
  Object.defineProperty(String.prototype, 'reverse', {
    value: function (...args: any[]) {
      return (stringCase as any).reverse(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.sentenceCase) {
  Object.defineProperty(String.prototype, 'sentenceCase', {
    value: function (...args: any[]) {
      return (stringCase as any).sentenceCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.slugify) {
  Object.defineProperty(String.prototype, 'slugify', {
    value: function (...args: any[]) {
      return (stringCase as any).slugify(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.snakeCase) {
  Object.defineProperty(String.prototype, 'snakeCase', {
    value: function (...args: any[]) {
      return (stringCase as any).snakeCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.swapCase) {
  Object.defineProperty(String.prototype, 'swapCase', {
    value: function (...args: any[]) {
      return (stringCase as any).swapCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.titleCase) {
  Object.defineProperty(String.prototype, 'titleCase', {
    value: function (...args: any[]) {
      return (stringCase as any).titleCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

if (!String.prototype.upperCase) {
  Object.defineProperty(String.prototype, 'upperCase', {
    value: function (...args: any[]) {
      return (stringCase as any).upperCase(this as any, ...args);
    },
    writable: true,
    configurable: true
  });
}

// --- TYPESCRIPT DECLARATIONS ---
declare global {
  interface String {
    /** Based on: export function abbreviation(text: string): string {
     // Split by spaces, hyphens, or underscores, filter out empty strings
     const words = text.split(/[\s_-]+/).filter(Boolean);

     // Get the first letter of each word
     const shortName = words.map((word) => word[0]).join('');

     return shortName;
     } */
    abbreviation(this: string,): string;

    /** Based on: export function alternatingCase(text: string): string {
     return text
     .split(/([\s-]+)/)
     .map((word) =>
     word
     .split('')
     .map((char, index) => {
     // Четные индексы - строчные, нечетные - заглавные
     return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
     })
     .join(''),
     )
     .join('');
     } */
    alternatingCase(this: string,): string;

    /** Based on: export function camelCase(text: string): string {
     // 1-5. Normalize the string using the same logic as snake_case
     // This breaks the string into segments separated by underscores
     text = text
     // Handle Acronyms: 'JSONData' -> 'JSON_Data'
     .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
     // Handle CamelCase: 'camelCase' -> 'camel_Case'
     .replace(/([a-z])([A-Z])/g, '$1_$2')
     // Handle Letters to Numbers: 'version2' -> 'version_2'
     .replace(/([a-zA-Z])([0-9])/g, '$1_$2')
     // Handle Numbers to Letters: '2beta' -> '2_beta'
     .replace(/([0-9])([a-zA-Z])/g, '$1_$2')
     // Replace delimiters with underscore
     .replace(/[ |_\-\.]+/g, '_')
     // Trim surrounding underscores
     .replace(/^_+|_+$/g, '')
     // Lowercase the entire normalized string first
     .toLowerCase();

     // 6. Convert snake_case segments to camelCase
     // Looks for an underscore followed by a character (letter or number)
     return text.replace(/_([a-z0-9])/g, (match, char) => char.toUpperCase());
     } */
    camelCase(this: string,): string;

    /** Based on: export function capitalize(text: string): string {
     return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
     } */
    capitalize(this: string,): string;

    /** Based on: export function constantCase(text: string): string {
     return (
     text
     // Вставляем пробел между маленькой и большой буквой (camelCase -> camel Case)
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     // Заменяем все не буквенно-цифровые символы на пробелы
     .replace(/[^a-zA-Z0-9]+/g, ' ')
     .trim()
     .split(/\s+/)
     .map((word) => word.toUpperCase())
     .join('_')
     );
     } */
    constantCase(this: string,): string;

    /** Based on: export function dotCase(text: string): string {
     return text
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/[^a-zA-Z0-9]+/g, ' ')
     .trim()
     .split(/\s+/)
     .map((word) => word.toLowerCase())
     .join('.');
     } */
    dotCase(this: string,): string;

    /** Based on: export function headerCase(text: string): string {
     return text
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/[^a-zA-Z0-9]+/g, ' ')
     .trim()
     .split(/\s+/)
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
     .join('-');
     } */
    headerCase(this: string,): string;

    /** Based on: export function humanize(text: string): string {
     const separated = text
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/[_-]+/g, ' ')
     .replace(/\s+/g, ' ')
     .trim()
     .toLowerCase();

     return stringCase.capitalize(separated);
     } */
    humanize(this: string,): string;

    /** Based on: export function isAlpha(text: string): boolean {
     return /^[a-zA-Z]+$/.test(text);
     } */
    isAlpha(this: string,): boolean;

    /** Based on: export function isAlphanumeric(text: string): boolean {
     return /^[a-z0-9]+$/i.test(text);
     } */
    isAlphanumeric(this: string,): boolean;

    /** Based on: export function isLowerCase(text: string): boolean {
     return text === text.toLowerCase();
     } */
    isLowerCase(this: string,): boolean;

    /** Based on: export function isUpperCase(text: string): boolean {
     return text === text.toUpperCase();
     } */
    isUpperCase(this: string,): boolean;

    /** Based on: export function kebabCase(text: string): string {
     return (
     text // 1. Handle Acronyms: 'JSONData' -> 'JSON_Data'
     // Looks for Capital followed by Capital+Lower
     .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')

     // 2. Handle CamelCase: 'camelCase' -> 'camel_Case'
     // Looks for Lower followed by Capital
     .replace(/([a-z])([A-Z])/g, '$1-$2')

     // 3. Handle Letters to Numbers: 'version2' -> 'version_2'
     .replace(/([a-zA-Z])([0-9])/g, '$1-$2')

     // 4. Handle Numbers to Letters: '2beta' -> '2_beta'
     .replace(/([0-9])([a-zA-Z])/g, '$1-$2')

     // 5. Replace delimiters (spaces, hyphens, dots) with a single underscore
     // This collapses multiple separators (e.g. ' - ' becomes '-')
     .replace(/[ |_\-\.]+/g, '-')
     // from _text_ -> text
     .replace(/^[_-]+|[_-]+$/g, '')

     // 6. Final lowercase
     .toLowerCase()
     );
     } */
    kebabCase(this: string,): string;

    /** Based on: export function lowerCase(text: string): string {
     return text.toLowerCase();
     } */
    lowerCase(this: string,): string;

    /** Based on: export function pascalCase(text: string): string {
     return (text.match(/[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z])|[A-Z]+|[a-z]+|[0-9]+/g) ?? [])
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
     .join('');
     } */
    pascalCase(this: string,): string;

    /** Based on: export function pathCase(text: string): string {
     return text
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/[^a-zA-Z0-9]+/g, ' ')
     .trim()
     .split(/\s+/)
     .map((word) => word.toLowerCase())
     .join('/');
     } */
    pathCase(this: string,): string;

    /** Based on: export function reverse(text: string): string {
     return [...text].reverse().join('');
     } */
    reverse(this: string,): string;

    /** Based on: export function sentenceCase(text: string): string {
     const cleanedText = text
     .replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/[^a-zA-Z0-9]+/g, ' ')
     .trim()
     .toLowerCase();

     return cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
     } */
    sentenceCase(this: string,): string;

    /** Based on: export function slugify(text: string): string {
     return text
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .toLowerCase()
     .replace(/[^a-z0-9]+/g, '-')
     .replace(/^-+|-+$/g, '');
     } */
    slugify(this: string,): string;

    /** Based on: export function snakeCase(text: string): string {
     return (
     text
     // 1. Handle Acronyms: 'JSONData' -> 'JSON_Data'
     // Looks for Capital followed by Capital+Lower
     .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')

     // 2. Handle CamelCase: 'camelCase' -> 'camel_Case'
     // Looks for Lower followed by Capital
     .replace(/([a-z])([A-Z])/g, '$1_$2')

     // 3. Handle Letters to Numbers: 'version2' -> 'version_2'
     .replace(/([a-zA-Z])([0-9])/g, '$1_$2')

     // 4. Handle Numbers to Letters: '2beta' -> '2_beta'
     .replace(/([0-9])([a-zA-Z])/g, '$1_$2')

     // 5. Replace delimiters (spaces, hyphens, dots) with a single underscore
     // This collapses multiple separators (e.g. ' - ' becomes '_')
     .replace(/[ |_\-.]+/g, '_')
     // from _text_ -> text
     .replace(/^_+|_+$/g, '')

     // 6. Final lowercase
     .toLowerCase()
     );
     } */
    snakeCase(this: string,): string;

    /** Based on: export function swapCase(text: string): string {
     return text.replace(/./g, (char) => {
     const lower = char.toLowerCase();
     return char === lower ? char.toUpperCase() : lower;
     });
     } */
    swapCase(this: string,): string;

    /** Based on: export function titleCase(text: string): string {
     return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
     } */
    titleCase(this: string,): string;

    /** Based on: export function upperCase(text: string): string {
     return text.toUpperCase();
     } */
    upperCase(this: string,): string;
  }
}
export {};
