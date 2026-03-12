import { firstKey } from './first_key';
import * as exceptions from '@razomy/exceptions';

describe('dict', () => {
  describe('firstKey', () => {
    // 1. Standard cases
    it('returns the first key of a dictionary with multiple keys', () => {
      expect(firstKey({ a: 1, b: 2 })).toBe('a');
    });

    it('returns the first key of a dictionary with a single key', () => {
      expect(firstKey({ name: 'Alice' })).toBe('name');
    });

    // 2. Empty dictionary
    it('throws ArgumentException for an empty dictionary', () => {
      expect(() => firstKey({})).toThrow(exceptions.ArgumentException);
      expect(() => firstKey({})).toThrow('no keys in object');
    });

    // 3. Different value types
    it('works with various value types', () => {
      expect(firstKey({ x: undefined })).toBe('x');
      expect(firstKey({ y: null })).toBe('y');
      expect(firstKey({ z: 0 })).toBe('z');
      expect(firstKey({ w: false })).toBe('w');
      expect(firstKey({ arr: [1, 2, 3] })).toBe('arr');
      expect(firstKey({ obj: { nested: true } })).toBe('obj');
    });

    // 4. Only own enumerable keys
    it('ignores inherited properties and returns only own keys', () => {
      const parent = { inherited: 'yes' };
      const child = Object.create(parent);
      child.own = 'value';

      expect(firstKey(child)).toBe('own');
    });

    it('throws ArgumentException when object has only inherited properties', () => {
      const parent = { inherited: 'yes' };
      const child = Object.create(parent);

      expect(() => firstKey(child)).toThrow(exceptions.ArgumentException);
    });

    // 5. Numeric-like keys
    it('returns numeric-like keys as strings', () => {
      expect(firstKey({ 0: 'zero', 1: 'one' })).toBe('0');
    });

    // 6. Multiple keys - returns the first one
    it('returns the first key in insertion order', () => {
      const obj: Record<string, number> = {};
      obj['b'] = 2;
      obj['a'] = 1;
      obj['c'] = 3;

      expect(firstKey(obj)).toBe('b');
    });

    // 7. Keys with special characters
    it('works with keys that have special characters', () => {
      expect(firstKey({ 'foo-bar': 1 })).toBe('foo-bar');
      expect(firstKey({ '': 'empty key' })).toBe('');
    });
  });
});
