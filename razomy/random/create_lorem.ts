import * as random from '@razomy/random';

const loremWords: string[] = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'in',
  'reprehenderit',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
];

/**
 * @summary Generates random Lorem Ipsum text.
 * @description Generates a random sequence of Lorem Ipsum words of the specified length. The resulting string is capitalized and ends with a period.
 * @param wordCount The number of words to generate.
 * @returns The generated Lorem Ipsum string.
 * @example
 * ```ts
 * createLorem(3); // => 'Dolor sit amet.'
 * ```
 * @example
 * ```ts
 * createLorem(5); // => 'Elit sed do eiusmod tempor.'
 * ```
 * @example
 * ```ts
 * createLorem(1); // => 'Consectetur.'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function createLorem(wordCount: number = 32): string {
  if (wordCount <= 0) return '';

  const result: string[] = [];
  const wordsLength: number = loremWords.length;

  for (let i: number = 0; i < wordCount; i++) {
    result.push(loremWords[Math.floor(random.createFloat() * wordsLength)]);
  }

  const text: string = result.join(' ');

  // Capitalize the first letter and append a period
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}
