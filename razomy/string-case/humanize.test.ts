import { humanize } from './humanize';

describe('string', () => {
  describe('humanize', () => {
    // 1. Standard casing styles
    it('humanizes camelCase', () => {
      expect(humanize('camelCase')).toBe('Camel case');
    });

    it('humanizes PascalCase', () => {
      expect(humanize('PascalCase')).toBe('Pascal case');
    });

    it('humanizes kebab-case', () => {
      expect(humanize('kebab-case')).toBe('Kebab case');
    });

    it('humanizes snake_case', () => {
      expect(humanize('snake_case')).toBe('Snake case');
    });

    // 2. Handling Delimiters and Spacing
    it('replaces underscores and hyphens with spaces', () => {
      expect(humanize('foo-bar_baz')).toBe('Foo bar baz');
    });

    it('collapses multiple delimiters and spaces', () => {
      expect(humanize('foo   bar__baz--qux')).toBe('Foo bar baz qux');
    });

    it('trims leading and trailing whitespace', () => {
      expect(humanize('  foo bar  ')).toBe('Foo bar');
    });

    // 3. Numbers
    it('preserves numbers', () => {
      expect(humanize('chapter_1')).toBe('Chapter 1');
      expect(humanize('version-2-beta')).toBe('Version 2 beta');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(humanize('')).toBe('');
    });

    it('handles single characters', () => {
      expect(humanize('a')).toBe('A');
    });

    it('handles already humanized strings', () => {
      expect(humanize('Already humanized')).toBe('Already humanized');
    });

    it('lowercases rest of the string', () => {
      expect(humanize('ALL CAPS SENTENCE')).toBe('All caps sentence');
    });
  });
});
