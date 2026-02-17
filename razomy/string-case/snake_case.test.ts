import {snakeCase} from '@razomy/string-case';

describe('string', () => {
  describe('snake_case_string', () => {

    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(snakeCase('camelCase')).toBe('camel_case');
    });

    it('converts PascalCase', () => {
      expect(snakeCase('PascalCase')).toBe('pascal_case');
    });

    it('converts kebab-case', () => {
      expect(snakeCase('kebab-case')).toBe('kebab_case');
    });

    it('keeps snake_case', () => {
      expect(snakeCase('snake_case')).toBe('snake_case');
    });

    it('converts sentence casing', () => {
      expect(snakeCase('Foo Bar')).toBe('foo_bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(snakeCase('foo.bar|baz')).toBe('foo_bar_baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(snakeCase('__foo_bar__')).toBe('foo_bar');
      expect(snakeCase('-foo-bar-')).toBe('foo_bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(snakeCase('a-AA')).toBe('a_aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(snakeCase('JSONData')).toBe('json_data');
    });

    it('handles acronyms in middle', () => {
      expect(snakeCase('serverHTTPResponse')).toBe('server_http_response');
    });

    it('handles acronyms at end', () => {
      expect(snakeCase('parseXML')).toBe('parse_xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(snakeCase('version2beta')).toBe('version_2_beta');
      expect(snakeCase('h2o')).toBe('h_2_o');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(snakeCase('version-10-beta')).toBe('version_10_beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(snakeCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(snakeCase('A')).toBe('a');
    });
// 1. Data Preservation (The fix for your concern)
    it('preserves special characters (non-destructive)', () => {
      expect(snakeCase('C#Project')).toBe('c#project');
      expect(snakeCase('user@email.com')).toBe('user@email_com');
      expect(snakeCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling (The fix for "version2beta")
    it('splits numbers adjacent to letters', () => {
      expect(snakeCase('version2beta')).toBe('version_2_beta');
      expect(snakeCase('foo123bar')).toBe('foo_123_bar');
      expect(snakeCase('404error')).toBe('404_error');
    });

    // 3. Standard Cases
    it('handles standard camel and pascal case', () => {
      expect(snakeCase('camelCase')).toBe('camel_case');
      expect(snakeCase('PascalCase')).toBe('pascal_case');
    });

    it('handles acronyms intelligently', () => {
      expect(snakeCase('JSONData')).toBe('json_data');
      expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(snakeCase('foo  bar')).toBe('foo_bar');
      expect(snakeCase('foo-bar.baz')).toBe('foo_bar_baz');
      expect(snakeCase('a-AA')).toBe('a_aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(snakeCase('')).toBe('');
    });
  });
});