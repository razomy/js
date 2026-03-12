import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('is_lower_case', () => {
    // 1. Basic functionality
    it('returns true for all lowercase string', () => {
      expect(stringCase.isLowerCase('razomy')).toBe(true);
    });

    it('returns false for all uppercase string', () => {
      expect(stringCase.isLowerCase('RAZOMY')).toBe(false);
    });

    it('returns false for mixed case string', () => {
      expect(stringCase.isLowerCase('Razomy')).toBe(false);
      expect(stringCase.isLowerCase('camelCase')).toBe(false);
    });

    // 2. Non-alphabetic characters
    it('returns true for string with numbers', () => {
      expect(stringCase.isLowerCase('123')).toBe(true);
      expect(stringCase.isLowerCase('string 123')).toBe(true);
    });

    it('returns true for string with special characters', () => {
      expect(stringCase.isLowerCase('user@domain.com')).toBe(true);
      expect(stringCase.isLowerCase('$money$')).toBe(true);
      expect(stringCase.isLowerCase('kebab-case')).toBe(true);
      expect(stringCase.isLowerCase('snake_case')).toBe(true);
    });

    // 3. Mixed content
    it('returns false if uppercase exists amidst symbols or numbers', () => {
      expect(stringCase.isLowerCase('User@Domain.com')).toBe(false);
      expect(stringCase.isLowerCase('Item #5A')).toBe(false);
    });

    // 4. Edge cases
    it('returns true for empty string', () => {
      expect(stringCase.isLowerCase('')).toBe(true);
    });
  });
});
