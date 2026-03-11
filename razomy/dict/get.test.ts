import { get } from './get';

describe('dictionary', () => {
  describe('get', () => {
    // 1. Standard cases
    it('returns the value associated with a string key', () => {
      expect(get({ a: 1 }, 'a')).toBe(1);
    });

    it('returns a string value associated with a key', () => {
      expect(get({ b: 'hello' }, 'b')).toBe('hello');
    });

    it('returns null when the value is null', () => {
      expect(get({ c: null }, 'c')).toBeNull();
    });

    // 2. Different value types
    it('returns undefined when the value is explicitly undefined', () => {
      expect(get({ d: undefined }, 'd')).toBeUndefined();
    });

    it('returns a boolean value', () => {
      expect(get({ flag: true }, 'flag')).toBe(true);
      expect(get({ flag: false }, 'flag')).toBe(false);
    });

    it('returns an object value', () => {
      const nested = { x: 10 };
      expect(get({ obj: nested }, 'obj')).toBe(nested);
    });

    it('returns an array value', () => {
      const arr = [1, 2, 3];
      expect(get({ list: arr }, 'list')).toBe(arr);
    });

    it('returns a function value', () => {
      function fn() {
        return 42;
      }
      expect(get({ action: fn }, 'action')).toBe(fn);
    });

    // 3. Numeric and zero values
    it('returns 0 as a value', () => {
      expect(get({ zero: 0 }, 'zero')).toBe(0);
    });

    it('returns a negative number', () => {
      expect(get({ neg: -5 }, 'neg')).toBe(-5);
    });

    // 4. Multiple keys in dictionary
    it('returns the correct value when multiple keys exist', () => {
      const dict = { a: 1, b: 2, c: 3 };
      expect(get(dict, 'a')).toBe(1);
      expect(get(dict, 'b')).toBe(2);
      expect(get(dict, 'c')).toBe(3);
    });

    // 5. Non-existent keys
    it('returns undefined for a key that does not exist', () => {
      const dict = { a: 1 } as Record<string, any>;
      expect(get(dict, 'nonexistent')).toBeUndefined();
    });

    // 6. Empty dictionary
    it('returns undefined when accessing any key on an empty dictionary', () => {
      const dict = {} as Record<string, any>;
      expect(get(dict, 'anything')).toBeUndefined();
    });

    // 7. Numeric keys
    it('works with numeric keys', () => {
      const dict = { 0: 'zero', 1: 'one' } as Record<number, string>;
      expect(get(dict, 0)).toBe('zero');
      expect(get(dict, 1)).toBe('one');
    });

    // 8. Empty string key
    it('works with an empty string key', () => {
      expect(get({ '': 'empty' }, '')).toBe('empty');
    });

    // 9. Special string values
    it('returns an empty string value', () => {
      expect(get({ key: '' }, 'key')).toBe('');
    });

    // 10. Does not mutate the dictionary
    it('does not mutate the original dictionary', () => {
      const dict = { a: 1, b: 2 };
      get(dict, 'a');
      expect(dict).toEqual({ a: 1, b: 2 });
    });
  });
});
