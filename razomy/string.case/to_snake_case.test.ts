import {toSnakeCase} from 'razomy.string.case';

describe('string', () => {
  describe('snake_case_string', () => {

    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(toSnakeCase('camelCase')).toBe('camel_case');
    });

    it('converts PascalCase', () => {
      expect(toSnakeCase('PascalCase')).toBe('pascal_case');
    });

    it('converts kebab-case', () => {
      expect(toSnakeCase('kebab-case')).toBe('kebab_case');
    });

    it('keeps snake_case', () => {
      expect(toSnakeCase('snake_case')).toBe('snake_case');
    });

    it('converts sentence casing', () => {
      expect(toSnakeCase('Foo Bar')).toBe('foo_bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(toSnakeCase('foo.bar|baz')).toBe('foo_bar_baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(toSnakeCase('__foo_bar__')).toBe('foo_bar');
      expect(toSnakeCase('-foo-bar-')).toBe('foo_bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(toSnakeCase('a-AA')).toBe('a_aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(toSnakeCase('JSONData')).toBe('json_data');
    });

    it('handles acronyms in middle', () => {
      expect(toSnakeCase('serverHTTPResponse')).toBe('server_http_response');
    });

    it('handles acronyms at end', () => {
      expect(toSnakeCase('parseXML')).toBe('parse_xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(toSnakeCase('version2beta')).toBe('version_2_beta');
      expect(toSnakeCase('h2o')).toBe('h_2_o');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(toSnakeCase('version-10-beta')).toBe('version_10_beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(toSnakeCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(toSnakeCase('A')).toBe('a');
    });
// 1. Data Preservation (The fix for your concern)
    it('preserves special characters (non-destructive)', () => {
      expect(toSnakeCase('C#Project')).toBe('c#project');
      expect(toSnakeCase('user@email.com')).toBe('user@email_com');
      expect(toSnakeCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling (The fix for "version2beta")
    it('splits numbers adjacent to letters', () => {
      expect(toSnakeCase('version2beta')).toBe('version_2_beta');
      expect(toSnakeCase('foo123bar')).toBe('foo_123_bar');
      expect(toSnakeCase('404error')).toBe('404_error');
    });

    // 3. Standard Cases
    it('handles standard camel and pascal case', () => {
      expect(toSnakeCase('camelCase')).toBe('camel_case');
      expect(toSnakeCase('PascalCase')).toBe('pascal_case');
    });

    it('handles acronyms intelligently', () => {
      expect(toSnakeCase('JSONData')).toBe('json_data');
      expect(toSnakeCase('XMLHttpRequest')).toBe('xml_http_request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(toSnakeCase('foo  bar')).toBe('foo_bar');
      expect(toSnakeCase('foo-bar.baz')).toBe('foo_bar_baz');
      expect(toSnakeCase('a-AA')).toBe('a_aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(toSnakeCase('')).toBe('');
    });
  });
});