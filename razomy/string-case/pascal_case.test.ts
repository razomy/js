import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('pascal_case', () => {
    // 1. Standard casing styles
    it('keeps PascalCase', () => {
      expect(stringCase.pascalCase('PascalCase')).toBe('PascalCase');
    });

    it('converts camelCase', () => {
      expect(stringCase.pascalCase('camelCase')).toBe('CamelCase');
    });

    it('converts kebab-case', () => {
      expect(stringCase.pascalCase('kebab-case')).toBe('KebabCase');
    });

    it('converts snake_case', () => {
      expect(stringCase.pascalCase('snake_case')).toBe('SnakeCase');
    });

    it('converts sentence casing', () => {
      expect(stringCase.pascalCase('Foo Bar')).toBe('FooBar');
    });

    it('converts ALL CAPS', () => {
      expect(stringCase.pascalCase('FOO_BAR')).toBe('FooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(stringCase.pascalCase('foo.bar|baz')).toBe('FooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.pascalCase('__foo_bar__')).toBe('FooBar');
      expect(stringCase.pascalCase('-foo-bar-')).toBe('FooBar');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(stringCase.pascalCase('JSONData')).toBe('JsonData');
    });

    it('handles acronyms in middle', () => {
      expect(stringCase.pascalCase('serverHTTPResponse')).toBe('ServerHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(stringCase.pascalCase('parseXML')).toBe('ParseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(stringCase.pascalCase('version2beta')).toBe('Version2Beta');
      expect(stringCase.pascalCase('h2o')).toBe('H2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(stringCase.pascalCase('version-10-beta')).toBe('Version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.pascalCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.pascalCase('a')).toBe('A');
    });
  });
});
