import { titleCase } from '@razomy/string-case';

describe('string', () => {
  describe('title_case', () => {
    // 1. Standard casing styles
    it('converts lowercase string', () => {
      expect(titleCase('foo bar')).toBe('Foo Bar');
    });

    it('converts uppercase string', () => {
      expect(titleCase('HELLO WORLD')).toBe('Hello World');
    });

    it('converts mixed case string', () => {
      expect(titleCase('fOo BaR')).toBe('Foo Bar');
      expect(titleCase('tHiS iS tEsT')).toBe('This Is Test');
    });

    // 2. Handling Delimiters (Based on Regex \b behavior)
    it('capitalizes after hyphens', () => {
      expect(titleCase('one-two')).toBe('One-Two');
      expect(titleCase('foo-bar-baz')).toBe('Foo-Bar-Baz');
    });

    it('capitalizes after dots', () => {
      expect(titleCase('example.com')).toBe('Example.Com');
    });

    it('does not capitalize after underscores (underscore is a word char)', () => {
      expect(titleCase('snake_case')).toBe('Snake_case');
      expect(titleCase('user_id')).toBe('User_id');
    });

    // 3. Numbers and Special Characters
    it('handles numbers correctly', () => {
      // Numbers are word characters, so '1st' -> '1st'
      expect(titleCase('1st place')).toBe('1st Place');
      expect(titleCase('chapter 10')).toBe('Chapter 10');
    });

    it('handles special characters causing boundaries', () => {
      expect(titleCase('@handle')).toBe('@Handle');
      expect(titleCase('#hashtag')).toBe('#Hashtag');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(titleCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(titleCase('a')).toBe('A');
      expect(titleCase('Z')).toBe('Z');
    });
  });
});
