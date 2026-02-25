import { isLowerCase } from '@razomy/string-case';

describe('string', () => {
  describe('is_lower_case', () => {
    // 1. Basic functionality
    it('returns true for all lowercase string', () => {
      expect(isLowerCase('razomy')).toBe(true);
    });

    it('returns false for all uppercase string', () => {
      expect(isLowerCase('RAZOMY')).toBe(false);
    });

    it('returns false for mixed case string', () => {
      expect(isLowerCase('Razomy')).toBe(false);
      expect(isLowerCase('camelCase')).toBe(false);
    });

    // 2. Non-alphabetic characters
    it('returns true for string with numbers', () => {
      expect(isLowerCase('123')).toBe(true);
      expect(isLowerCase('string 123')).toBe(true);
    });

    it('returns true for string with special characters', () => {
      expect(isLowerCase('user@domain.com')).toBe(true);
      expect(isLowerCase('$money$')).toBe(true);
      expect(isLowerCase('kebab-case')).toBe(true);
      expect(isLowerCase('snake_case')).toBe(true);
    });

    // 3. Mixed content
    it('returns false if uppercase exists amidst symbols or numbers', () => {
      expect(isLowerCase('User@Domain.com')).toBe(false);
      expect(isLowerCase('Item #5A')).toBe(false);
    });

    // 4. Edge cases
    it('returns true for empty string', () => {
      expect(isLowerCase('')).toBe(true);
    });
  });
});
