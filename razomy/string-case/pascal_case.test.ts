import { pascalCase } from '@razomy/string-case';

describe('string', () => {
  describe('pascal_case', () => {
    // 1. Standard casing styles
    it('keeps PascalCase', () => {
      expect(pascalCase('PascalCase')).toBe('PascalCase');
    });

    it('converts camelCase', () => {
      expect(pascalCase('camelCase')).toBe('CamelCase');
    });

    it('converts kebab-case', () => {
      expect(pascalCase('kebab-case')).toBe('KebabCase');
    });

    it('converts snake_case', () => {
      expect(pascalCase('snake_case')).toBe('SnakeCase');
    });

    it('converts sentence casing', () => {
      expect(pascalCase('Foo Bar')).toBe('FooBar');
    });

    it('converts ALL CAPS', () => {
      expect(pascalCase('FOO_BAR')).toBe('FooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(pascalCase('foo.bar|baz')).toBe('FooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(pascalCase('__foo_bar__')).toBe('FooBar');
      expect(pascalCase('-foo-bar-')).toBe('FooBar');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(pascalCase('JSONData')).toBe('JsonData');
    });

    it('handles acronyms in middle', () => {
      expect(pascalCase('serverHTTPResponse')).toBe('ServerHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(pascalCase('parseXML')).toBe('ParseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(pascalCase('version2beta')).toBe('Version2Beta');
      expect(pascalCase('h2o')).toBe('H2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(pascalCase('version-10-beta')).toBe('Version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(pascalCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(pascalCase('a')).toBe('A');
    });
  });
});