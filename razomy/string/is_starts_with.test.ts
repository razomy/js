import { isStartsWith } from './is_starts_with';

describe('string', () => {
  describe('isStartsWith', () => {
    // 1. Standard cases
    it('returns true if string starts with the target', () => {
      expect(isStartsWith('razomy', 'r')).toBe(true);
    });

    it('returns true if string starts with a multi-character target', () => {
      expect(isStartsWith('razomy', 'raz')).toBe(true);
    });

    it('returns false if string does not start with the target', () => {
      expect(isStartsWith('razomy', 'z')).toBe(false);
    });

    // 2. Position parameter
    it('returns true if string starts with the target at the given position', () => {
      expect(isStartsWith('razomy', 'z', 2)).toBe(true);
    });

    it('returns false if string does not start with the target at the given position', () => {
      expect(isStartsWith('razomy', 'r', 2)).toBe(false);
    });

    it('returns true if string starts with multi-character target at the given position', () => {
      expect(isStartsWith('razomy', 'zom', 2)).toBe(true);
    });

    // 3. Empty strings
    it('returns true if target is an empty string', () => {
      expect(isStartsWith('razomy', '')).toBe(true);
    });

    it('returns true if both string and target are empty', () => {
      expect(isStartsWith('', '')).toBe(true);
    });

    it('returns false if string is empty but target is not', () => {
      expect(isStartsWith('', 'a')).toBe(false);
    });

    // 4. Full string match
    it('returns true if target equals the entire string', () => {
      expect(isStartsWith('razomy', 'razomy')).toBe(true);
    });

    it('returns false if target is longer than the string', () => {
      expect(isStartsWith('raz', 'razomy')).toBe(false);
    });

    // 5. Edge cases with position
    it('returns true if target is empty string at any position', () => {
      expect(isStartsWith('razomy', '', 5)).toBe(true);
    });

    it('returns false if position is beyond string length', () => {
      expect(isStartsWith('razomy', 'r', 100)).toBe(false);
    });

    it('returns true when position is at the last character and target matches', () => {
      expect(isStartsWith('razomy', 'y', 5)).toBe(true);
    });

    // 6. Default position parameter
    it('defaults position to 0 when not provided', () => {
      expect(isStartsWith('razomy', 'raz')).toBe(true);
    });

    // 7. Case sensitivity
    it('is case-sensitive', () => {
      expect(isStartsWith('Razomy', 'r')).toBe(false);
      expect(isStartsWith('Razomy', 'R')).toBe(true);
    });

    // 8. Special characters
    it('works with special characters', () => {
      expect(isStartsWith('!@#hello', '!@#')).toBe(true);
      expect(isStartsWith('hello world', 'world', 6)).toBe(true);
    });

    it('works with unicode characters', () => {
      expect(isStartsWith('über cool', 'über')).toBe(true);
      expect(isStartsWith('日本語', '日本')).toBe(true);
    });
  });
});