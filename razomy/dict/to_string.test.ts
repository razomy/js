import * as dict_ from "@razomy/dict";

describe('dict', () => {
  describe('toString_', () => {
    // 1. Empty dictionary
    it('returns "{}" for an empty dictionary', () => {
      expect(dict_.toString_({})).toBe('{}');
    });

    // 2. Single key-value pair
    it('returns the correct format for a single entry', () => {
      expect(dict_.toString_({ a: 'b' })).toBe('{a:b;}');
    });

    // 3. Multiple key-value pairs
    it('returns the correct format for multiple entries', () => {
      const result = dict_.toString_({ k: 'v', id: '1' });
      expect(result).toBe('{k:v;id:1;}');
    });

    // 4. Values with various characters
    it('handles values with spaces', () => {
      expect(dict_.toString_({ name: 'hello world' })).toBe('{name:hello world;}');
    });

    it('handles keys and values with numbers', () => {
      expect(dict_.toString_({ count: '42', max: '100' })).toBe('{count:42;max:100;}');
    });

    // 5. Single character keys and values
    it('handles single character keys and values', () => {
      expect(dict_.toString_({ x: 'y' })).toBe('{x:y;}');
    });

    // 6. Multiple entries maintain key order
    it('includes all key-value pairs in the result', () => {
      const dict = { a: '1', b: '2', c: '3' };
      const result = dict_.toString_(dict);
      expect(result.startsWith('{')).toBe(true);
      expect(result.endsWith('}')).toBe(true);
      expect(result).toContain('a:1;');
      expect(result).toContain('b:2;');
      expect(result).toContain('c:3;');
    });

    // 7. Values that are empty strings
    it('handles empty string values', () => {
      expect(dict_.toString_({ key: '' })).toBe('{key:;}');
    });

    // 8. Keys with longer names
    it('handles longer key names', () => {
      expect(dict_.toString_({ longKeyName: 'value' })).toBe('{longKeyName:value;}');
    });

    // 9. Special characters in values
    it('handles special characters in values', () => {
      expect(dict_.toString_({ path: '/usr/bin' })).toBe('{path:/usr/bin;}');
    });

    // 10. Result always wrapped in curly braces
    it('always wraps the result in curly braces', () => {
      const result = dict_.toString_({ foo: 'bar' });
      expect(result[0]).toBe('{');
      expect(result[result.length - 1]).toBe('}');
    });
  });
});
