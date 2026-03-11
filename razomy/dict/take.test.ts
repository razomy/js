import { take } from './take';

describe('object', () => {
  describe('take', () => {
    // 1. Standard cases
    it('extracts specified keys from an object', () => {
      expect(take({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('extracts a single key from an object', () => {
      expect(take({ id: 1, name: 'A' }, ['id'])).toEqual({ id: 1 });
    });

    it('extracts all keys from an object', () => {
      expect(take({ x: 10, y: 20 }, ['x', 'y'])).toEqual({ x: 10, y: 20 });
    });

    // 2. Empty keys array
    it('returns an empty object when no keys are specified', () => {
      expect(take({ x: 10, y: 20 }, [])).toEqual({});
    });

    // 3. Empty source object
    it('returns an empty object when the source object is empty', () => {
      expect(take({} as Record<string, never>, [])).toEqual({});
    });

    // 4. Various value types
    it('works with different value types', () => {
      const obj = { str: 'hello', num: 42, bool: true, arr: [1, 2], nested: { a: 1 } };
      expect(take(obj, ['str', 'arr', 'nested'])).toEqual({
        str: 'hello',
        arr: [1, 2],
        nested: { a: 1 },
      });
    });

    // 5. Preserves references for object values
    it('preserves references for object and array values', () => {
      const arr = [1, 2, 3];
      const nested = { a: 1 };
      const obj = { arr, nested, num: 5 };
      const result = take(obj, ['arr', 'nested']);

      expect(result.arr).toBe(arr);
      expect(result.nested).toBe(nested);
    });

    // 6. Does not include keys not in the keys array
    it('does not include keys that are not specified', () => {
      const result = take({ a: 1, b: 2, c: 3 }, ['a'] as const);
      expect(result).toEqual({ a: 1 });
      expect(Object.keys(result)).toEqual(['a']);
    });

    // 7. Handles undefined values
    it('extracts keys with undefined values', () => {
      const obj: { a: number; b: undefined } = { a: 1, b: undefined };
      const result = take(obj, ['b']);
      expect(result).toEqual({ b: undefined });
      expect('b' in result).toBe(true);
    });

    // 8. Handles null values
    it('extracts keys with null values', () => {
      const obj: { a: number; b: null } = { a: 1, b: null };
      const result = take(obj, ['b']);
      expect(result).toEqual({ b: null });
    });

    // 9. Duplicate keys in the keys array
    it('handles duplicate keys gracefully', () => {
      const obj = { a: 1, b: 2 };
      const result = take(obj, ['a', 'a'] as Array<'a' | 'b'>);
      expect(result).toEqual({ a: 1 });
    });

    // 10. Works with string-keyed objects
    it('works with objects that have string values', () => {
      const obj = { firstName: 'John', lastName: 'Doe', age: 30 };
      expect(take(obj, ['firstName', 'lastName'])).toEqual({
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    // 11. Result is a new object, not the original
    it('returns a new object, not the original', () => {
      const obj = { a: 1, b: 2 };
      const result = take(obj, ['a', 'b']);
      expect(result).toEqual(obj);
      expect(result).not.toBe(obj);
    });
  });
});