import * as string from "@razomy/string";

describe('string', () => {
  describe('countSpaceMargin', () => {
    // 1. Standard cases
    it('returns 0 for a string with no leading spaces', () => {
      expect(string.countSpaceMargin('hello')).toBe(0);
    });

    it('returns the correct count for a string with leading spaces', () => {
      expect(string.countSpaceMargin('   hello')).toBe(3);
    });

    it('returns the length of a string that is all spaces', () => {
      expect(string.countSpaceMargin('     ')).toBe(5);
    });

    // 2. Empty string
    it('returns 0 for an empty string', () => {
      expect(string.countSpaceMargin('')).toBe(0);
    });

    // 3. Single character
    it('returns 0 for a single non-space character', () => {
      expect(string.countSpaceMargin('a')).toBe(0);
    });

    it('returns 1 for a single space character', () => {
      expect(string.countSpaceMargin(' ')).toBe(1);
    });

    // 4. Trailing spaces are not counted
    it('does not count trailing spaces', () => {
      expect(string.countSpaceMargin('hello   ')).toBe(0);
    });

    // 5. Mixed leading spaces and trailing spaces
    it('only counts leading spaces, not trailing ones', () => {
      expect(string.countSpaceMargin('  hello  ')).toBe(2);
    });

    // 6. Tabs and other whitespace characters are not counted as spaces
    it('does not count leading tab characters as spaces', () => {
      expect(string.countSpaceMargin('\thello')).toBe(0);
    });

    it('does not count leading newline characters as spaces', () => {
      expect(string.countSpaceMargin('\nhello')).toBe(0);
    });

    // 7. Spaces followed by tabs
    it('counts only spaces before a tab character', () => {
      expect(string.countSpaceMargin('  \thello')).toBe(2);
    });

    // 8. String with spaces in the middle
    it('only counts leading spaces, not spaces in the middle', () => {
      expect(string.countSpaceMargin('hello world')).toBe(0);
    });

    it('counts leading spaces before content with internal spaces', () => {
      expect(string.countSpaceMargin('    hello world')).toBe(4);
    });

    // 9. Large leading space margin
    it('handles a large number of leading spaces', () => {
      const spaces = ' '.repeat(1000);
      expect(string.countSpaceMargin(spaces + 'hello')).toBe(1000);
    });

    // 10. Unicode characters after spaces
    it('counts leading spaces before unicode characters', () => {
      expect(string.countSpaceMargin('  🚀hello')).toBe(2);
    });
  });
});
