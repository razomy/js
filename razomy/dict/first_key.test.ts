import * as exceptions from '@razomy/exceptions';
import * as dict from "@razomy/dict";

describe('dict', () => {
  describe('firstKey', () => {
    // 1. Standard cases
    it('returns the first key of a dictionary with multiple keys', () => {
      expect(dict.firstKey({ a: 1, b: 2 })).toBe('a');
    });

    it('returns the first key of a dictionary with a single key', () => {
      expect(dict.firstKey({ name: 'Alice' })).toBe('name');
    });

    // 2. Empty dictionary
    it('throws ArgumentException for an empty dictionary', () => {
      expect(() => dict.firstKey({})).toThrow(exceptions.ArgumentException);
      expect(() => dict.firstKey({})).toThrow('no keys in object');
    });

    // 3. Different value types
    it('works with various value types', () => {
      expect(dict.firstKey({ x: undefined })).toBe('x');
      expect(dict.firstKey({ y: null })).toBe('y');
      expect(dict.firstKey({ z: 0 })).toBe('z');
      expect(dict.firstKey({ w: false })).toBe('w');
      expect(dict.firstKey({ arr: [1, 2, 3] })).toBe('arr');
      expect(dict.firstKey({ obj: { nested: true } })).toBe('obj');
    });

    // 4. Only own enumerable keys
    it('ignores inherited properties and returns only own keys', () => {
      const parent = { inherited: 'yes' };
      const child = Object.create(parent);
      child.own = 'value';

      expect(dict.firstKey(child)).toBe('own');
    });

    it('throws ArgumentException when object has only inherited properties', () => {
      const parent = { inherited: 'yes' };
      const child = Object.create(parent);

      expect(() => dict.firstKey(child)).toThrow(exceptions.ArgumentException);
    });

    // 5. Numeric-like keys
    it('returns numeric-like keys as strings', () => {
      expect(dict.firstKey({ 0: 'zero', 1: 'one' })).toBe('0');
    });

    // 6. Multiple keys - returns the first one
    it('returns the first key in insertion order', () => {
      const obj: Record<string, number> = {};
      obj['b'] = 2;
      obj['a'] = 1;
      obj['c'] = 3;

      expect(dict.firstKey(obj)).toBe('b');
    });

    // 7. Keys with special characters
    it('works with keys that have special characters', () => {
      expect(dict.firstKey({ 'foo-bar': 1 })).toBe('foo-bar');
      expect(dict.firstKey({ '': 'empty key' })).toBe('');
    });
  });
});
