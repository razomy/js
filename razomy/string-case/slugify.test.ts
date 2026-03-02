import { slugify } from '@razomy/string-case';

describe('string', () => {
  describe('slugify', () => {
    // 1. Standard text conversion
    it('slugifies standard sentences', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('keeps already slugified strings', () => {
      expect(slugify('hello-world')).toBe('hello-world');
    });

    it('converts camelCase to slug', () => {
      expect(slugify('camelCase')).toBe('camelcase');
    });

    // 2. Accents and Diacritics
    it('normalizes accents and diacritics', () => {
      expect(slugify('Crème Brûlée')).toBe('creme-brulee');
    });

    it('handles various international characters', () => {
      expect(slugify('ÀÁÂÃÄÅ Ç ÈÉÊË')).toBe('aaaaaa-c-eeee');
      expect(slugify('Español')).toBe('espanol');
    });

    // 3. Special Characters and Delimiters
    it('replaces special characters with hyphens', () => {
      expect(slugify('Foo & Bar')).toBe('foo-bar');
      expect(slugify('user@email.com')).toBe('user-email-com');
    });

    it('replaces underscores with hyphens', () => {
      expect(slugify('snake_case')).toBe('snake-case');
    });

    it('removes non-alphanumeric characters entirely if adjacent to separators', () => {
      // "money" -> lower -> [^a-z0-9]+ -> "-" -> trim
      expect(slugify('$$money$$')).toBe('money');
    });

    // 4. Formatting and Cleanup
    it('trims leading and trailing delimiters', () => {
      expect(slugify('-foo-bar-')).toBe('foo-bar');
      expect(slugify('  foo bar  ')).toBe('foo-bar');
    });

    it('collapses multiple delimiters into one', () => {
      expect(slugify('foo   bar')).toBe('foo-bar');
      expect(slugify('foo...bar')).toBe('foo-bar');
      expect(slugify('foo--bar')).toBe('foo-bar');
    });

    // 5. Numbers
    it('preserves numbers within the slug', () => {
      expect(slugify('Version 2.0')).toBe('version-2-0');
      expect(slugify('h2o')).toBe('h2o');
    });

    // 6. Edge cases
    it('returns empty string for empty input', () => {
      expect(slugify('')).toBe('');
    });

    it('returns empty string for strings containing only symbols', () => {
      expect(slugify('?&%')).toBe('');
    });
  });
});
