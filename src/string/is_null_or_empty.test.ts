import * as string from '@razomy/string';

describe('string', () => {
  describe('isNullOrEmpty', () => {
    // 1. Null and undefined
    it('returns true for null', () => {
      expect(string.isNullOrEmpty(null)).toBe(true);
    });

    it('returns true for undefined', () => {
      expect(string.isNullOrEmpty(undefined)).toBe(true);
    });

    // 2. Empty string
    it('returns true for an empty string', () => {
      expect(string.isNullOrEmpty('')).toBe(true);
    });

    // 3. Whitespace-only strings
    it('returns true for a string with only spaces', () => {
      expect(string.isNullOrEmpty('   ')).toBe(true);
    });

    it('returns true for a string with tabs and newlines', () => {
      expect(string.isNullOrEmpty('\t\n\r')).toBe(true);
    });

    it('returns true for a single space', () => {
      expect(string.isNullOrEmpty(' ')).toBe(true);
    });

    it('returns true for mixed whitespace characters', () => {
      expect(string.isNullOrEmpty('  \t  \n  ')).toBe(true);
    });

    // 4. Non-empty strings
    it('returns false for a non-empty string', () => {
      expect(string.isNullOrEmpty('razomy')).toBe(false);
    });

    it('returns false for a string with leading and trailing spaces but content', () => {
      expect(string.isNullOrEmpty('  hello  ')).toBe(false);
    });

    it('returns false for a single character', () => {
      expect(string.isNullOrEmpty('a')).toBe(false);
    });

    it('returns false for a string with numbers', () => {
      expect(string.isNullOrEmpty('123')).toBe(false);
    });

    it('returns false for a string with special characters', () => {
      expect(string.isNullOrEmpty('!@#$%')).toBe(false);
    });

    // 5. Edge cases
    it('returns false for a string containing "null"', () => {
      expect(string.isNullOrEmpty('null')).toBe(false);
    });

    it('returns false for a string containing "undefined"', () => {
      expect(string.isNullOrEmpty('undefined')).toBe(false);
    });

    it('returns false for a zero character "0"', () => {
      expect(string.isNullOrEmpty('0')).toBe(false);
    });

    // 6. Type narrowing
    it('acts as a type guard narrowing the type', () => {
      const value: string | null | undefined = 'hello';
      if (!string.isNullOrEmpty(value)) {
        // If TypeScript type narrowing works, value should be `string` here
        const result: string = value;
        expect(result).toBe('hello');
      }
    });
  });
});
