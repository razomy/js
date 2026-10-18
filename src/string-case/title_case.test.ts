import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('title_case', () => {
    // 1. Standard casing styles
    it('converts lowercase string', () => {
      expect(stringCase.titleCase('foo bar')).toBe('Foo Bar');
    });

    it('converts uppercase string', () => {
      expect(stringCase.titleCase('HELLO WORLD')).toBe('Hello World');
    });

    it('converts mixed case string', () => {
      expect(stringCase.titleCase('fOo BaR')).toBe('Foo Bar');
      expect(stringCase.titleCase('tHiS iS tEsT')).toBe('This Is Test');
    });

    // 2. Handling Delimiters (Based on Regex \b behavior)
    it('capitalizes after hyphens', () => {
      expect(stringCase.titleCase('one-two')).toBe('One-Two');
      expect(stringCase.titleCase('foo-bar-baz')).toBe('Foo-Bar-Baz');
    });

    it('capitalizes after dots', () => {
      expect(stringCase.titleCase('example.com')).toBe('Example.Com');
    });

    it('does not capitalize after underscores (underscore is a word char)', () => {
      expect(stringCase.titleCase('snake_case')).toBe('Snake_case');
      expect(stringCase.titleCase('user_id')).toBe('User_id');
    });

    // 3. Numbers and Special Characters
    it('handles numbers correctly', () => {
      // Numbers are word characters, so '1st' -> '1st'
      expect(stringCase.titleCase('1st place')).toBe('1st Place');
      expect(stringCase.titleCase('chapter 10')).toBe('Chapter 10');
    });

    it('handles special characters causing boundaries', () => {
      expect(stringCase.titleCase('@handle')).toBe('@Handle');
      expect(stringCase.titleCase('#hashtag')).toBe('#Hashtag');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.titleCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.titleCase('a')).toBe('A');
      expect(stringCase.titleCase('Z')).toBe('Z');
    });
  });
});
