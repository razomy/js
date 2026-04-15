import * as string from "@razomy/string";

describe('string', () => {
  describe('getWords', () => {
    // 1. Standard cases
    it('splits a comma-separated string into words', () => {
      expect(string.getWords('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    it('splits camelCase into separate words', () => {
      expect(string.getWords('camelCase')).toEqual(['camel', 'Case']);
    });

    it('splits snake_case into separate words', () => {
      expect(string.getWords('nested_snake_case')).toEqual(['nested', 'snake', 'case']);
    });

    // 2. Empty and whitespace strings
    it('returns an empty array for an empty string', () => {
      expect(string.getWords('')).toEqual([]);
    });

    it('returns an empty array for a string with only special characters', () => {
      expect(string.getWords('!@#$%^&*()')).toEqual([]);
    });

    it('returns an empty array for a string with only whitespace', () => {
      expect(string.getWords('   ')).toEqual([]);
    });

    // 3. PascalCase
    it('splits PascalCase into separate words', () => {
      expect(string.getWords('PascalCase')).toEqual(['Pascal', 'Case']);
    });

    // it('splits multi-word PascalCase', () => {
    //   expect(getWords('ThisIsATest')).toEqual(['This', 'Is', 'A', 'Test']);
    // });

    // 4. kebab-case
    it('splits kebab-case into separate words', () => {
      expect(string.getWords('kebab-case-string')).toEqual(['kebab', 'case', 'string']);
    });

    // 5. Mixed cases
    it('splits a mixed case string with numbers', () => {
      expect(string.getWords('hello2World')).toEqual(['hello', '2', 'World']);
    });

    it('handles numbers as separate words', () => {
      expect(string.getWords('version123Release')).toEqual(['version', '123', 'Release']);
    });

    it('handles standalone numbers', () => {
      expect(string.getWords('42')).toEqual(['42']);
    });

    // 6. Uppercase acronyms
    it('handles uppercase acronyms followed by lowercase words', () => {
      expect(string.getWords('HTMLParser')).toEqual(['HTML', 'Parser']);
    });

    it('handles fully uppercase strings', () => {
      expect(string.getWords('ABC')).toEqual(['ABC']);
    });

    it('handles uppercase acronyms in the middle of a string', () => {
      expect(string.getWords('parseHTMLDocument')).toEqual(['parse', 'HTML', 'Document']);
    });

    // 7. Single word
    it('returns a single-element array for a single lowercase word', () => {
      expect(string.getWords('hello')).toEqual(['hello']);
    });

    it('returns a single-element array for a single uppercase word', () => {
      expect(string.getWords('HELLO')).toEqual(['HELLO']);
    });

    it('returns a single-element array for a single capitalized word', () => {
      expect(string.getWords('Hello')).toEqual(['Hello']);
    });

    // 8. Strings with spaces
    it('splits space-separated words', () => {
      expect(string.getWords('hello world')).toEqual(['hello', 'world']);
    });

    it('splits words with multiple spaces between them', () => {
      expect(string.getWords('hello   world')).toEqual(['hello', 'world']);
    });

    // 9. Mixed delimiters
    it('handles a mix of delimiters (dots, dashes, underscores)', () => {
      expect(string.getWords('foo.bar-baz_qux')).toEqual(['foo', 'bar', 'baz', 'qux']);
    });

    // 10. Complex real-world examples
    it('handles complex camelCase with acronyms and numbers', () => {
      expect(string.getWords('getHTTP2Response')).toEqual(['get', 'HTTP', '2', 'Response']);
    });

    it('splits a sentence with punctuation', () => {
      expect(string.getWords("It's a test!")).toEqual(['It', 's', 'a', 'test']);
    });

    // 11. Single character
    it('handles a single lowercase character', () => {
      expect(string.getWords('a')).toEqual(['a']);
    });

    it('handles a single uppercase character', () => {
      expect(string.getWords('A')).toEqual(['A']);
    });

    it('handles a single digit', () => {
      expect(string.getWords('5')).toEqual(['5']);
    });
  });
});
