import { dotCase } from '@razomy/string-case';

describe('string', () => {
  describe('dot_case', () => {
    // 1. Standard casing styles
    it('keeps dot.case', () => {
      expect(dotCase('dot.case')).toBe('dot.case');
    });

    it('converts PascalCase', () => {
      expect(dotCase('PascalCase')).toBe('pascal.case');
    });

    it('converts camelCase', () => {
      expect(dotCase('camelCase')).toBe('camel.case');
    });

    it('converts kebab-case', () => {
      expect(dotCase('kebab-case')).toBe('kebab.case');
    });

    it('converts snake_case', () => {
      expect(dotCase('snake_case')).toBe('snake.case');
    });

    it('converts sentence casing', () => {
      expect(dotCase('Hello World')).toBe('hello.world');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters', () => {
      expect(dotCase('foo.bar|baz')).toBe('foo.bar.baz');
    });

    it('collapses multiple delimiters', () => {
      expect(dotCase('foo  bar')).toBe('foo.bar');
      expect(dotCase('foo--bar')).toBe('foo.bar');
      expect(dotCase('foo__bar')).toBe('foo.bar');
    });

    it('trims leading/trailing delimiters', () => {
      expect(dotCase('__foo_bar__')).toBe('foo.bar');
      expect(dotCase('-foo-bar-')).toBe('foo.bar');
      expect(dotCase('.foo.bar.')).toBe('foo.bar');
    });

    // 3. Numbers
    it('handles numbers with delimiters', () => {
      expect(dotCase('version 1.0')).toBe('version.1.0');
    });

    it('does not split numbers adjacent to letters (implementation specific)', () => {
      // Based on the provided regex, 'word1' remains 'word1'
      expect(dotCase('version2beta')).toBe('version2beta');
      expect(dotCase('h2o')).toBe('h2o');
    });

    // 4. Special Characters (Destructive)
    it('removes special characters', () => {
      expect(dotCase('user@email.com')).toBe('user.email.com');
      expect(dotCase('#tag')).toBe('tag');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(dotCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(dotCase('A')).toBe('a');
    });

    it('handles uppercase strings', () => {
      // "HELLO" -> "hello" (no camel boundaries found)
      expect(dotCase('HELLO')).toBe('hello');
    });
  });
});