import * as string from "@razomy/string";

describe('string', () => {
  describe('isEndsWithAny', () => {
    // 1. Standard cases
    it('returns true if string ends with one of the target strings', () => {
      expect(string.isEndsWithAny('image.jpg', ['.jpg', '.png'])).toBe(true);
    });

    it('returns true if string ends with the last target in the array', () => {
      expect(string.isEndsWithAny('image.png', ['.jpg', '.png'])).toBe(true);
    });

    it('returns false if string does not end with any of the target strings', () => {
      expect(string.isEndsWithAny('image.gif', ['.jpg', '.png'])).toBe(false);
    });

    // 2. Position parameter
    it('returns true when using position parameter and string ends with target up to that position', () => {
      expect(string.isEndsWithAny('abc', ['a', 'b'], 2)).toBe(true);
    });

    it('returns true when position limits the search to a substring that matches', () => {
      expect(string.isEndsWithAny('abc', ['a'], 1)).toBe(true);
    });

    it('returns false when position limits the search and no target matches', () => {
      expect(string.isEndsWithAny('abc', ['c'], 2)).toBe(false);
    });

    // 3. Empty arrays
    it('returns false if targets array is empty', () => {
      expect(string.isEndsWithAny('hello', [])).toBe(false);
    });

    // 4. Empty string
    it('returns true if one of the targets is an empty string', () => {
      expect(string.isEndsWithAny('hello', ['', '.jpg'])).toBe(true);
    });

    it('returns true if text is empty and targets contain an empty string', () => {
      expect(string.isEndsWithAny('', [''])).toBe(true);
    });

    it('returns false if text is empty and targets contain only non-empty strings', () => {
      expect(string.isEndsWithAny('', ['.jpg', '.png'])).toBe(false);
    });

    // 5. Single target
    it('works correctly with a single target that matches', () => {
      expect(string.isEndsWithAny('hello world', ['world'])).toBe(true);
    });

    it('works correctly with a single target that does not match', () => {
      expect(string.isEndsWithAny('hello world', ['earth'])).toBe(false);
    });

    // 6. Multiple matching targets
    it('returns true if multiple targets match (short-circuits on first match)', () => {
      expect(string.isEndsWithAny('test.tar.gz', ['.gz', '.tar.gz'])).toBe(true);
    });

    // 7. Case sensitivity
    it('is case-sensitive', () => {
      expect(string.isEndsWithAny('image.JPG', ['.jpg', '.png'])).toBe(false);
    });

    // 8. Exact match
    it('returns true when text exactly equals one of the targets', () => {
      expect(string.isEndsWithAny('hello', ['hello', 'world'])).toBe(true);
    });

    // 9. Target longer than text
    it('returns false if target is longer than the text', () => {
      expect(string.isEndsWithAny('hi', ['hello', 'world'])).toBe(false);
    });

    // 10. Position parameter edge cases
    it('handles position of 0', () => {
      expect(string.isEndsWithAny('abc', ['a', 'b', 'c'], 0)).toBe(false);
    });

    it('handles position equal to string length (behaves like no position)', () => {
      expect(string.isEndsWithAny('abc', ['c'], 3)).toBe(true);
    });

    it('handles position greater than string length', () => {
      expect(string.isEndsWithAny('abc', ['c'], 100)).toBe(true);
    });
  });
});
