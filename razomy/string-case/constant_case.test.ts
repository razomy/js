import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('constant_case', () => {
    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(stringCase.constantCase('camelCase')).toBe('CAMEL_CASE');
    });

    it('converts PascalCase', () => {
      expect(stringCase.constantCase('PascalCase')).toBe('PASCAL_CASE');
    });

    it('converts kebab-case', () => {
      expect(stringCase.constantCase('kebab-case')).toBe('KEBAB_CASE');
    });

    it('converts snake_case', () => {
      expect(stringCase.constantCase('snake_case')).toBe('SNAKE_CASE');
    });

    it('converts sentence casing', () => {
      expect(stringCase.constantCase('Hello World')).toBe('HELLO_WORLD');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(stringCase.constantCase('foo.bar|baz')).toBe('FOO_BAR_BAZ');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.constantCase('__foo_bar__')).toBe('FOO_BAR');
      expect(stringCase.constantCase('-foo-bar-')).toBe('FOO_BAR');
    });

    it('collapses multiple spaces/delimiters', () => {
      expect(stringCase.constantCase('foo   bar')).toBe('FOO_BAR');
      expect(stringCase.constantCase('foo--bar')).toBe('FOO_BAR');
    });

    // 3. Numbers
    it('preserves numbers', () => {
      expect(stringCase.constantCase('version2beta')).toBe('VERSION2BETA');
      expect(stringCase.constantCase('foo123bar')).toBe('FOO123BAR');
    });

    it('handles delimited numbers', () => {
      expect(stringCase.constantCase('version-10-beta')).toBe('VERSION_10_BETA');
      expect(stringCase.constantCase('404_error')).toBe('404_ERROR');
    });

    // 4. Special Characters (Destructive)
    it('removes special characters', () => {
      // Logic replaces /[^a-zA-Z0-9]+/g with space
      expect(stringCase.constantCase('user@email.com')).toBe('USER_EMAIL_COM');
      expect(stringCase.constantCase('$$money$$')).toBe('MONEY');
      expect(stringCase.constantCase('c#project')).toBe('C_PROJECT');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.constantCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.constantCase('a')).toBe('A');
      expect(stringCase.constantCase('A')).toBe('A');
    });

    it('handles already constant cased strings', () => {
      expect(stringCase.constantCase('CONSTANT_CASE')).toBe('CONSTANT_CASE');
    });
  });
});
