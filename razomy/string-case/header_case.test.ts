import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('header_case', () => {
    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(stringCase.headerCase('camelCase')).toBe('Camel-Case');
    });

    it('converts PascalCase', () => {
      expect(stringCase.headerCase('PascalCase')).toBe('Pascal-Case');
    });

    it('converts kebab-case', () => {
      expect(stringCase.headerCase('kebab-case')).toBe('Kebab-Case');
    });

    it('converts snake_case', () => {
      expect(stringCase.headerCase('snake_case')).toBe('Snake-Case');
    });

    it('converts sentence casing', () => {
      expect(stringCase.headerCase('hello world')).toBe('Hello-World');
    });

    it('normalizes UPPER CASE', () => {
      expect(stringCase.headerCase('HELLO WORLD')).toBe('Hello-World');
    });

    // 2. Handling Delimiters & Special Characters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(stringCase.headerCase('foo.bar baz')).toBe('Foo-Bar-Baz');
    });

    it('treats special characters as delimiters', () => {
      expect(stringCase.headerCase('user@company.com')).toBe('User-Company-Com');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.headerCase('__hello_world__')).toBe('Hello-World');
      expect(stringCase.headerCase('-camel-case-')).toBe('Camel-Case');
    });

    it('collapses multiple delimiters', () => {
      expect(stringCase.headerCase('foo___bar')).toBe('Foo-Bar');
    });

    // 3. Numbers
    it('handles numbers separated by delimiters', () => {
      expect(stringCase.headerCase('version_1_2')).toBe('Version-1-2');
    });

    it('keeps numbers attached if no delimiter exists', () => {
      expect(stringCase.headerCase('version2')).toBe('Version2');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.headerCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.headerCase('a')).toBe('A');
    });

    it('handles single uppercase characters', () => {
      expect(stringCase.headerCase('A')).toBe('A');
    });
  });
});
