import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('dot_case', () => {
    // 1. Standard casing styles
    it('keeps dot.case', () => {
      expect(stringCase.dotCase('dot.case')).toBe('dot.case');
    });

    it('converts PascalCase', () => {
      expect(stringCase.dotCase('PascalCase')).toBe('pascal.case');
    });

    it('converts camelCase', () => {
      expect(stringCase.dotCase('camelCase')).toBe('camel.case');
    });

    it('converts kebab-case', () => {
      expect(stringCase.dotCase('kebab-case')).toBe('kebab.case');
    });

    it('converts snake_case', () => {
      expect(stringCase.dotCase('snake_case')).toBe('snake.case');
    });

    it('converts sentence casing', () => {
      expect(stringCase.dotCase('Hello World')).toBe('hello.world');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters', () => {
      expect(stringCase.dotCase('foo.bar|baz')).toBe('foo.bar.baz');
    });

    it('collapses multiple delimiters', () => {
      expect(stringCase.dotCase('foo  bar')).toBe('foo.bar');
      expect(stringCase.dotCase('foo--bar')).toBe('foo.bar');
      expect(stringCase.dotCase('foo__bar')).toBe('foo.bar');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.dotCase('__foo_bar__')).toBe('foo.bar');
      expect(stringCase.dotCase('-foo-bar-')).toBe('foo.bar');
      expect(stringCase.dotCase('.foo.bar.')).toBe('foo.bar');
    });

    // 3. Numbers
    it('handles numbers with delimiters', () => {
      expect(stringCase.dotCase('version 1.0')).toBe('version.1.0');
    });

    it('does not split numbers adjacent to letters (implementation specific)', () => {
      // Based on the provided regex, 'word1' remains 'word1'
      expect(stringCase.dotCase('version2beta')).toBe('version2beta');
      expect(stringCase.dotCase('h2o')).toBe('h2o');
    });

    // 4. Special Characters (Destructive)
    it('removes special characters', () => {
      expect(stringCase.dotCase('user@email.com')).toBe('user.email.com');
      expect(stringCase.dotCase('#tag')).toBe('tag');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.dotCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.dotCase('A')).toBe('a');
    });

    it('handles uppercase strings', () => {
      // "HELLO" -> "hello" (no camel boundaries found)
      expect(stringCase.dotCase('HELLO')).toBe('hello');
    });
  });
});
