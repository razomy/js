import { getWords } from './get_words';

describe('string', () => {
  describe('getWords', () => {
    // 1. Standard cases
    it('splits a comma-separated string into words', () => {
      expect(getWords('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    it('splits camelCase into separate words', () => {
      expect(getWords('camelCase')).toEqual(['camel', 'Case']);
    });

    it('splits snake_case into separate words', () => {
      expect(getWords('nested_snake_case')).toEqual(['nested', 'snake', 'case']);
    });

    // 2. Empty and whitespace strings
    it('returns an empty array for an empty string', () => {
      expect(getWords('')).toEqual([]);
    });

    it('returns an empty array for a string with only special characters', () => {
      expect(getWords('!@#$%^&*()')).toEqual([]);
    });

    it('returns an empty array for a string with only whitespace', () => {
      expect(getWords('   ')).toEqual([]);
    });

    // 3. PascalCase
    it('splits PascalCase into separate words', () => {
      expect(getWords('PascalCase')).toEqual(['Pascal', 'Case']);
    });

    // it('splits multi-word PascalCase', () => {
    //   expect(getWords('ThisIsATest')).toEqual(['This', 'Is', 'A', 'Test']);
    // });

    // 4. kebab-case
    it('splits kebab-case into separate words', () => {
      expect(getWords('kebab-case-string')).toEqual(['kebab', 'case', 'string']);
    });

    // 5. Mixed cases
    it('splits a mixed case string with numbers', () => {
      expect(getWords('hello2World')).toEqual(['hello', '2', 'World']);
    });

    it('handles numbers as separate words', () => {
      expect(getWords('version123Release')).toEqual(['version', '123', 'Release']);
    });

    it('handles standalone numbers', () => {
      expect(getWords('42')).toEqual(['42']);
    });

    // 6. Uppercase acronyms
    it('handles uppercase acronyms followed by lowercase words', () => {
      expect(getWords('HTMLParser')).toEqual(['HTML', 'Parser']);
    });

    it('handles fully uppercase strings', () => {
      expect(getWords('ABC')).toEqual(['ABC']);
    });

    it('handles uppercase acronyms in the middle of a string', () => {
      expect(getWords('parseHTMLDocument')).toEqual(['parse', 'HTML', 'Document']);
    });

    // 7. Single word
    it('returns a single-element array for a single lowercase word', () => {
      expect(getWords('hello')).toEqual(['hello']);
    });

    it('returns a single-element array for a single uppercase word', () => {
      expect(getWords('HELLO')).toEqual(['HELLO']);
    });

    it('returns a single-element array for a single capitalized word', () => {
      expect(getWords('Hello')).toEqual(['Hello']);
    });

    // 8. Strings with spaces
    it('splits space-separated words', () => {
      expect(getWords('hello world')).toEqual(['hello', 'world']);
    });

    it('splits words with multiple spaces between them', () => {
      expect(getWords('hello   world')).toEqual(['hello', 'world']);
    });

    // 9. Mixed delimiters
    it('handles a mix of delimiters (dots, dashes, underscores)', () => {
      expect(getWords('foo.bar-baz_qux')).toEqual(['foo', 'bar', 'baz', 'qux']);
    });

    // 10. Complex real-world examples
    it('handles complex camelCase with acronyms and numbers', () => {
      expect(getWords('getHTTP2Response')).toEqual(['get', 'HTTP', '2', 'Response']);
    });

    it('splits a sentence with punctuation', () => {
      expect(getWords("It's a test!")).toEqual(['It', 's', 'a', 'test']);
    });

    // 11. Single character
    it('handles a single lowercase character', () => {
      expect(getWords('a')).toEqual(['a']);
    });

    it('handles a single uppercase character', () => {
      expect(getWords('A')).toEqual(['A']);
    });

    it('handles a single digit', () => {
      expect(getWords('5')).toEqual(['5']);
    });
  });
});
