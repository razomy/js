import {camelCase} from '@razomy/string.case';

describe('string', () => {
  describe('camel_case_string', () => {

    // 1. Standard casing styles
    it('keeps camelCase', () => {
      expect(camelCase('camelCase')).toBe('camelCase');
    });

    it('converts PascalCase', () => {
      expect(camelCase('PascalCase')).toBe('pascalCase');
    });

    it('converts kebab-case', () => {
      expect(camelCase('kebab-case')).toBe('kebabCase');
    });

    it('converts snake_case', () => {
      expect(camelCase('snake_case')).toBe('snakeCase');
    });

    it('converts sentence casing', () => {
      expect(camelCase('Foo Bar')).toBe('fooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(camelCase('foo.bar|baz')).toBe('fooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(camelCase('__foo_bar__')).toBe('fooBar');
      expect(camelCase('-foo-bar-')).toBe('fooBar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(camelCase('a-AA')).toBe('aAa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(camelCase('JSONData')).toBe('jsonData');
    });

    it('handles acronyms in middle', () => {
      expect(camelCase('serverHTTPResponse')).toBe('serverHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(camelCase('parseXML')).toBe('parseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version_2_beta' -> 'version2Beta'
      expect(camelCase('version2beta')).toBe('version2Beta');
      // 'h_2_o' -> 'h2O'
      expect(camelCase('h2o')).toBe('h2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(camelCase('version-10-beta')).toBe('version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(camelCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(camelCase('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(camelCase('C#Project')).toBe('c#project');
      expect(camelCase('user@email.com')).toBe('user@emailCom');
      expect(camelCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(camelCase('version2beta')).toBe('version2Beta');
      expect(camelCase('foo123bar')).toBe('foo123Bar');
      expect(camelCase('404error')).toBe('404Error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(camelCase('snake_case')).toBe('snakeCase');
      expect(camelCase('PascalCase')).toBe('pascalCase');
    });

    it('handles acronyms intelligently', () => {
      expect(camelCase('JSONData')).toBe('jsonData');
      expect(camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(camelCase('foo  bar')).toBe('fooBar');
      expect(camelCase('foo-bar.baz')).toBe('fooBarBaz');
      expect(camelCase('a-AA')).toBe('aAa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(camelCase('')).toBe('');
    });
  });
});