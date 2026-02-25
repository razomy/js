import { sentenceCase } from '@razomy/string-case';

describe('string', () => {
  describe('sentence_case', () => {
    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(sentenceCase('camelCase')).toBe('Camel case');
    });

    it('converts PascalCase', () => {
      expect(sentenceCase('PascalCase')).toBe('Pascal case');
    });

    it('converts kebab-case', () => {
      expect(sentenceCase('kebab-case')).toBe('Kebab case');
    });

    it('converts snake_case', () => {
      expect(sentenceCase('snake_case')).toBe('Snake case');
    });

    it('converts UPPER CASE', () => {
      expect(sentenceCase('UPPER CASE')).toBe('Upper case');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(sentenceCase('foo.bar baz')).toBe('Foo bar baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(sentenceCase('__foo_bar__')).toBe('Foo bar');
      expect(sentenceCase('-foo-bar-')).toBe('Foo bar');
    });

    it('collapses multiple delimiters into single space', () => {
      expect(sentenceCase('foo...bar___baz')).toBe('Foo bar baz');
    });

    // 3. Numbers
    it('preserves numbers', () => {
      expect(sentenceCase('version 2')).toBe('Version 2');
    });

    it('handles numbers within snake_case', () => {
      expect(sentenceCase('version_10_beta')).toBe('Version 10 beta');
    });

    it('does not split numbers attached to letters without delimiter', () => {
      // Logic: /([a-z])([A-Z])/ does not split letter-number or number-letter
      expect(sentenceCase('version2beta')).toBe('Version2beta');
    });

    // 4. Special Characters (Destructive behavior defined by regex)
    it('removes special characters', () => {
      expect(sentenceCase('user@email.com')).toBe('User email com');
      expect(sentenceCase('hello#world')).toBe('Hello world');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(sentenceCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(sentenceCase('a')).toBe('A');
      expect(sentenceCase('Z')).toBe('Z');
    });

    it('handles strings already in sentence case', () => {
      expect(sentenceCase('Hello world')).toBe('Hello world');
    });
  });
});