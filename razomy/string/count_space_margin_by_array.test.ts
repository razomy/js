import * as string from '@razomy/string';

describe('string', () => {
  describe('countSpaceMarginByArray', () => {
    // 1. Standard cases
    it('returns correct leading space counts for mixed strings', () => {
      expect(string.countSpaceMarginByArray(['  hello', '    world', 'foo'])).toEqual([2, 4, 0]);
    });

    it('returns correct counts for strings with varying margins', () => {
      expect(string.countSpaceMarginByArray([' a', '  b', '   c', '    d'])).toEqual([1, 2, 3, 4]);
    });

    // 2. Empty array
    it('returns an empty array for an empty input', () => {
      expect(string.countSpaceMarginByArray([])).toEqual([]);
    });

    // 3. Empty strings and whitespace-only strings
    it('returns correct counts for empty strings and whitespace-only strings', () => {
      expect(string.countSpaceMarginByArray(['', '   ', ' a'])).toEqual([0, 3, 1]);
    });

    it('returns 0 for an empty string', () => {
      expect(string.countSpaceMarginByArray([''])).toEqual([0]);
    });

    // 4. Strings with no leading spaces
    it('returns all zeros for strings with no leading spaces', () => {
      expect(string.countSpaceMarginByArray(['hello', 'world', 'foo'])).toEqual([0, 0, 0]);
    });

    // 5. Strings with only spaces
    it('returns the full length for strings composed entirely of spaces', () => {
      expect(string.countSpaceMarginByArray([' ', '  ', '     '])).toEqual([1, 2, 5]);
    });

    // 6. Single element array
    it('works correctly with a single element array', () => {
      expect(string.countSpaceMarginByArray(['   test'])).toEqual([3]);
    });

    // 7. Strings with trailing spaces (only leading spaces should count)
    it('only counts leading spaces, not trailing spaces', () => {
      expect(string.countSpaceMarginByArray(['hello   ', '  hello   '])).toEqual([0, 2]);
    });

    // 8. Strings with tabs and other whitespace (only spaces should count)
    it('does not count tabs as leading spaces', () => {
      expect(string.countSpaceMarginByArray(['\thello', ' \thello'])).toEqual([0, 1]);
    });

    // 9. Strings with spaces in the middle
    it('only counts leading spaces, not spaces in the middle', () => {
      expect(string.countSpaceMarginByArray(['  hello world', 'hello world'])).toEqual([2, 0]);
    });

    // 10. Large array
    it('handles a larger array correctly', () => {
      const input = Array.from({ length: 100 }, (_, i) => ' '.repeat(i) + 'x');
      const expected = Array.from({ length: 100 }, (_, i) => i);
      expect(string.countSpaceMarginByArray(input)).toEqual(expected);
    });
  });
});
