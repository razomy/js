import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('is_upper_case', () => {
    // 1. Basic Case Checks
    it('returns true for all uppercase string', () => {
      expect(stringCase.isUpperCase('HELLO')).toBe(true);
      expect(stringCase.isUpperCase('FOO BAR')).toBe(true);
    });

    it('returns false for all lowercase string', () => {
      expect(stringCase.isUpperCase('hello')).toBe(false);
    });

    it('returns false for mixed case string', () => {
      expect(stringCase.isUpperCase('Hello')).toBe(false);
      expect(stringCase.isUpperCase('HELLO world')).toBe(false);
    });

    // 2. Non-alphabetic characters
    it('returns true for strings with only numbers', () => {
      // Numbers are technically considered "upper case" regarding equality check vs toUpperCase()
      expect(stringCase.isUpperCase('123')).toBe(true);
    });

    it('returns true for strings with only symbols', () => {
      expect(stringCase.isUpperCase('!@#$')).toBe(true);
    });

    it('returns true for mixed uppercase and non-letters', () => {
      expect(stringCase.isUpperCase('HELLO 123!')).toBe(true);
    });

    // 3. Edge Cases
    it('returns true for empty string', () => {
      expect(stringCase.isUpperCase('')).toBe(true);
    });
  });
});
