import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('slugify', () => {
    // 1. Standard text conversion
    it('slugifies standard sentences', () => {
      expect(stringCase.slugify('Hello World')).toBe('hello-world');
    });

    it('keeps already slugified strings', () => {
      expect(stringCase.slugify('hello-world')).toBe('hello-world');
    });

    it('converts camelCase to slug', () => {
      expect(stringCase.slugify('camelCase')).toBe('camelcase');
    });

    // 2. Accents and Diacritics
    it('normalizes accents and diacritics', () => {
      expect(stringCase.slugify('Crème Brûlée')).toBe('creme-brulee');
    });

    it('handles various international characters', () => {
      expect(stringCase.slugify('ÀÁÂÃÄÅ Ç ÈÉÊË')).toBe('aaaaaa-c-eeee');
      expect(stringCase.slugify('Español')).toBe('espanol');
    });

    // 3. Special Characters and Delimiters
    it('replaces special characters with hyphens', () => {
      expect(stringCase.slugify('Foo & Bar')).toBe('foo-bar');
      expect(stringCase.slugify('user@email.com')).toBe('user-email-com');
    });

    it('replaces underscores with hyphens', () => {
      expect(stringCase.slugify('snake_case')).toBe('snake-case');
    });

    it('removes non-alphanumeric characters entirely if adjacent to separators', () => {
      // "money" -> lower -> [^a-z0-9]+ -> "-" -> trim
      expect(stringCase.slugify('$$money$$')).toBe('money');
    });

    // 4. Formatting and Cleanup
    it('trims leading and trailing delimiters', () => {
      expect(stringCase.slugify('-foo-bar-')).toBe('foo-bar');
      expect(stringCase.slugify('  foo bar  ')).toBe('foo-bar');
    });

    it('collapses multiple delimiters into one', () => {
      expect(stringCase.slugify('foo   bar')).toBe('foo-bar');
      expect(stringCase.slugify('foo...bar')).toBe('foo-bar');
      expect(stringCase.slugify('foo--bar')).toBe('foo-bar');
    });

    // 5. Numbers
    it('preserves numbers within the slug', () => {
      expect(stringCase.slugify('Version 2.0')).toBe('version-2-0');
      expect(stringCase.slugify('h2o')).toBe('h2o');
    });

    // 6. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.slugify('')).toBe('');
    });

    it('returns empty string for strings containing only symbols', () => {
      expect(stringCase.slugify('?&%')).toBe('');
    });
  });
});
