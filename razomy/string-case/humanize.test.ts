import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('humanize', () => {
    // 1. Standard casing styles
    it('humanizes camelCase', () => {
      expect(stringCase.humanize('camelCase')).toBe('Camel case');
    });

    it('humanizes PascalCase', () => {
      expect(stringCase.humanize('PascalCase')).toBe('Pascal case');
    });

    it('humanizes kebab-case', () => {
      expect(stringCase.humanize('kebab-case')).toBe('Kebab case');
    });

    it('humanizes snake_case', () => {
      expect(stringCase.humanize('snake_case')).toBe('Snake case');
    });

    // 2. Handling Delimiters and Spacing
    it('replaces underscores and hyphens with spaces', () => {
      expect(stringCase.humanize('foo-bar_baz')).toBe('Foo bar baz');
    });

    it('collapses multiple delimiters and spaces', () => {
      expect(stringCase.humanize('foo   bar__baz--qux')).toBe('Foo bar baz qux');
    });

    it('trims leading and trailing whitespace', () => {
      expect(stringCase.humanize('  foo bar  ')).toBe('Foo bar');
    });

    // 3. Numbers
    it('preserves numbers', () => {
      expect(stringCase.humanize('chapter_1')).toBe('Chapter 1');
      expect(stringCase.humanize('version-2-beta')).toBe('Version 2 beta');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.humanize('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.humanize('a')).toBe('A');
    });

    it('handles already humanized strings', () => {
      expect(stringCase.humanize('Already humanized')).toBe('Already humanized');
    });

    it('lowercases rest of the string', () => {
      expect(stringCase.humanize('ALL CAPS SENTENCE')).toBe('All caps sentence');
    });
  });
});
