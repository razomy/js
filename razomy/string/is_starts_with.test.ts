import * as string from "@razomy/string";

describe('string', () => {
  describe('isStartsWith', () => {
    // 1. Standard cases
    it('returns true if string starts with the target', () => {
      expect(string.isStartsWith('razomy', 'r')).toBe(true);
    });

    it('returns true if string starts with a multi-character target', () => {
      expect(string.isStartsWith('razomy', 'raz')).toBe(true);
    });

    it('returns false if string does not start with the target', () => {
      expect(string.isStartsWith('razomy', 'z')).toBe(false);
    });

    // 2. Position parameter
    it('returns true if string starts with the target at the given position', () => {
      expect(string.isStartsWith('razomy', 'z', 2)).toBe(true);
    });

    it('returns false if string does not start with the target at the given position', () => {
      expect(string.isStartsWith('razomy', 'r', 2)).toBe(false);
    });

    it('returns true if string starts with multi-character target at the given position', () => {
      expect(string.isStartsWith('razomy', 'zom', 2)).toBe(true);
    });

    // 3. Empty strings
    it('returns true if target is an empty string', () => {
      expect(string.isStartsWith('razomy', '')).toBe(true);
    });

    it('returns true if both string and target are empty', () => {
      expect(string.isStartsWith('', '')).toBe(true);
    });

    it('returns false if string is empty but target is not', () => {
      expect(string.isStartsWith('', 'a')).toBe(false);
    });

    // 4. Full string match
    it('returns true if target equals the entire string', () => {
      expect(string.isStartsWith('razomy', 'razomy')).toBe(true);
    });

    it('returns false if target is longer than the string', () => {
      expect(string.isStartsWith('raz', 'razomy')).toBe(false);
    });

    // 5. Edge cases with position
    it('returns true if target is empty string at any position', () => {
      expect(string.isStartsWith('razomy', '', 5)).toBe(true);
    });

    it('returns false if position is beyond string length', () => {
      expect(string.isStartsWith('razomy', 'r', 100)).toBe(false);
    });

    it('returns true when position is at the last character and target matches', () => {
      expect(string.isStartsWith('razomy', 'y', 5)).toBe(true);
    });

    // 6. Default position parameter
    it('defaults position to 0 when not provided', () => {
      expect(string.isStartsWith('razomy', 'raz')).toBe(true);
    });

    // 7. Case sensitivity
    it('is case-sensitive', () => {
      expect(string.isStartsWith('Razomy', 'r')).toBe(false);
      expect(string.isStartsWith('Razomy', 'R')).toBe(true);
    });

    // 8. Special characters
    it('works with special characters', () => {
      expect(string.isStartsWith('!@#hello', '!@#')).toBe(true);
      expect(string.isStartsWith('hello world', 'world', 6)).toBe(true);
    });

    it('works with unicode characters', () => {
      expect(string.isStartsWith('über cool', 'über')).toBe(true);
      expect(string.isStartsWith('日本語', '日本')).toBe(true);
    });
  });
});
