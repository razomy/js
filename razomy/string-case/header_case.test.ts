import { headerCase } from '@razomy/string-case';

describe('string', () => {
  describe('header_case', () => {
    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(headerCase('camelCase')).toBe('Camel-Case');
    });

    it('converts PascalCase', () => {
      expect(headerCase('PascalCase')).toBe('Pascal-Case');
    });

    it('converts kebab-case', () => {
      expect(headerCase('kebab-case')).toBe('Kebab-Case');
    });

    it('converts snake_case', () => {
      expect(headerCase('snake_case')).toBe('Snake-Case');
    });

    it('converts sentence casing', () => {
      expect(headerCase('hello world')).toBe('Hello-World');
    });

    it('normalizes UPPER CASE', () => {
      expect(headerCase('HELLO WORLD')).toBe('Hello-World');
    });

    // 2. Handling Delimiters & Special Characters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(headerCase('foo.bar baz')).toBe('Foo-Bar-Baz');
    });

    it('treats special characters as delimiters', () => {
      expect(headerCase('user@company.com')).toBe('User-Company-Com');
    });

    it('trims leading/trailing delimiters', () => {
      expect(headerCase('__hello_world__')).toBe('Hello-World');
      expect(headerCase('-camel-case-')).toBe('Camel-Case');
    });

    it('collapses multiple delimiters', () => {
      expect(headerCase('foo___bar')).toBe('Foo-Bar');
    });

    // 3. Numbers
    it('handles numbers separated by delimiters', () => {
      expect(headerCase('version_1_2')).toBe('Version-1-2');
    });

    it('keeps numbers attached if no delimiter exists', () => {
      expect(headerCase('version2')).toBe('Version2');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(headerCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(headerCase('a')).toBe('A');
    });

    it('handles single uppercase characters', () => {
      expect(headerCase('A')).toBe('A');
    });
  });
});
