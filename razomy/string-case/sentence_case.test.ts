import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('sentence_case', () => {
    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(stringCase.sentenceCase('camelCase')).toBe('Camel case');
    });

    it('converts PascalCase', () => {
      expect(stringCase.sentenceCase('PascalCase')).toBe('Pascal case');
    });

    it('converts kebab-case', () => {
      expect(stringCase.sentenceCase('kebab-case')).toBe('Kebab case');
    });

    it('converts snake_case', () => {
      expect(stringCase.sentenceCase('snake_case')).toBe('Snake case');
    });

    it('converts UPPER CASE', () => {
      expect(stringCase.sentenceCase('UPPER CASE')).toBe('Upper case');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(stringCase.sentenceCase('foo.bar baz')).toBe('Foo bar baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.sentenceCase('__foo_bar__')).toBe('Foo bar');
      expect(stringCase.sentenceCase('-foo-bar-')).toBe('Foo bar');
    });

    it('collapses multiple delimiters into single space', () => {
      expect(stringCase.sentenceCase('foo...bar___baz')).toBe('Foo bar baz');
    });

    // 3. Numbers
    it('preserves numbers', () => {
      expect(stringCase.sentenceCase('version 2')).toBe('Version 2');
    });

    it('handles numbers within snake_case', () => {
      expect(stringCase.sentenceCase('version_10_beta')).toBe('Version 10 beta');
    });

    it('does not split numbers attached to letters without delimiter', () => {
      // Logic: /([a-z])([A-Z])/ does not split letter-number or number-letter
      expect(stringCase.sentenceCase('version2beta')).toBe('Version2beta');
    });

    // 4. Special Characters (Destructive behavior defined by regex)
    it('removes special characters', () => {
      expect(stringCase.sentenceCase('user@email.com')).toBe('User email com');
      expect(stringCase.sentenceCase('hello#world')).toBe('Hello world');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.sentenceCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.sentenceCase('a')).toBe('A');
      expect(stringCase.sentenceCase('Z')).toBe('Z');
    });

    it('handles strings already in sentence case', () => {
      expect(stringCase.sentenceCase('Hello world')).toBe('Hello world');
    });
  });
});
