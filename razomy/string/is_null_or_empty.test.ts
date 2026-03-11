import { isNullOrEmpty } from './is_null_or_empty';

describe('string', () => {
  describe('isNullOrEmpty', () => {
    // 1. Null and undefined
    it('returns true for null', () => {
      expect(isNullOrEmpty(null)).toBe(true);
    });

    it('returns true for undefined', () => {
      expect(isNullOrEmpty(undefined)).toBe(true);
    });

    // 2. Empty string
    it('returns true for an empty string', () => {
      expect(isNullOrEmpty('')).toBe(true);
    });

    // 3. Whitespace-only strings
    it('returns true for a string with only spaces', () => {
      expect(isNullOrEmpty('   ')).toBe(true);
    });

    it('returns true for a string with tabs and newlines', () => {
      expect(isNullOrEmpty('\t\n\r')).toBe(true);
    });

    it('returns true for a single space', () => {
      expect(isNullOrEmpty(' ')).toBe(true);
    });

    it('returns true for mixed whitespace characters', () => {
      expect(isNullOrEmpty('  \t  \n  ')).toBe(true);
    });

    // 4. Non-empty strings
    it('returns false for a non-empty string', () => {
      expect(isNullOrEmpty('razomy')).toBe(false);
    });

    it('returns false for a string with leading and trailing spaces but content', () => {
      expect(isNullOrEmpty('  hello  ')).toBe(false);
    });

    it('returns false for a single character', () => {
      expect(isNullOrEmpty('a')).toBe(false);
    });

    it('returns false for a string with numbers', () => {
      expect(isNullOrEmpty('123')).toBe(false);
    });

    it('returns false for a string with special characters', () => {
      expect(isNullOrEmpty('!@#$%')).toBe(false);
    });

    // 5. Edge cases
    it('returns false for a string containing "null"', () => {
      expect(isNullOrEmpty('null')).toBe(false);
    });

    it('returns false for a string containing "undefined"', () => {
      expect(isNullOrEmpty('undefined')).toBe(false);
    });

    it('returns false for a zero character "0"', () => {
      expect(isNullOrEmpty('0')).toBe(false);
    });

    // 6. Type narrowing
    it('acts as a type guard narrowing the type', () => {
      const value: string | null | undefined = 'hello';
      if (!isNullOrEmpty(value)) {
        // If TypeScript type narrowing works, value should be `string` here
        const result: string = value;
        expect(result).toBe('hello');
      }
    });
  });
});
