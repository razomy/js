import { isUpperCase } from '@razomy/string-case';

describe('string', () => {
  describe('is_upper_case', () => {
    // 1. Basic Case Checks
    it('returns true for all uppercase string', () => {
      expect(isUpperCase('HELLO')).toBe(true);
      expect(isUpperCase('FOO BAR')).toBe(true);
    });

    it('returns false for all lowercase string', () => {
      expect(isUpperCase('hello')).toBe(false);
    });

    it('returns false for mixed case string', () => {
      expect(isUpperCase('Hello')).toBe(false);
      expect(isUpperCase('HELLO world')).toBe(false);
    });

    // 2. Non-alphabetic characters
    it('returns true for strings with only numbers', () => {
      // Numbers are technically considered "upper case" regarding equality check vs toUpperCase()
      expect(isUpperCase('123')).toBe(true);
    });

    it('returns true for strings with only symbols', () => {
      expect(isUpperCase('!@#$')).toBe(true);
    });

    it('returns true for mixed uppercase and non-letters', () => {
      expect(isUpperCase('HELLO 123!')).toBe(true);
    });

    // 3. Edge Cases
    it('returns true for empty string', () => {
      expect(isUpperCase('')).toBe(true);
    });
  });
});
