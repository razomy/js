import { merge } from './merge';

describe('dictionary', () => {
  describe('merge', () => {
    // 1. Standard cases
    it('merges two non-overlapping dictionaries', () => {
      expect(merge([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
    });

    it('merges with later entries overwriting earlier ones for duplicate keys', () => {
      expect(merge([{ a: 1 }, { a: 2, b: 3 }])).toEqual({ a: 2, b: 3 });
    });

    it('merges three dictionaries with mixed types', () => {
      expect(merge([{ x: 'hello' }, { y: 'world' }, { z: true }])).toEqual({
        x: 'hello',
        y: 'world',
        z: true,
      });
    });

    // 2. Empty inputs
    it('returns an empty object when given an empty array', () => {
      expect(merge([])).toEqual({});
    });

    it('returns an empty object when given an array of empty dictionaries', () => {
      expect(merge([{}, {}, {}])).toEqual({});
    });

    // 3. Single dictionary
    it('returns a copy of the single dictionary when given one element', () => {
      const input = { a: 1, b: 2 };
      const result = merge([input]);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    // 4. Overwriting behavior (left to right)
    it('last dictionary wins for overlapping keys across multiple dicts', () => {
      expect(merge([{ a: 1 }, { a: 2 }, { a: 3 }])).toEqual({ a: 3 });
    });

    it('overwrites values of different types', () => {
      expect(merge([{ a: 'string' }, { a: 42 }])).toEqual({ a: 42 });
    });

    // 5. Complex value types
    it('merges dictionaries with nested object values', () => {
      const result = merge([{ a: { nested: true } }, { b: [1, 2, 3] }]);
      expect(result).toEqual({ a: { nested: true }, b: [1, 2, 3] });
    });

    it('overwrites nested objects (shallow merge, not deep)', () => {
      const result = merge([{ a: { x: 1, y: 2 } }, { a: { z: 3 } }]);
      expect(result).toEqual({ a: { z: 3 } });
    });

    // 6. Various value types
    it('handles null and undefined values', () => {
      expect(merge([{ a: null }, { b: undefined }])).toEqual({ a: null, b: undefined });
    });

    it('handles numeric and boolean values', () => {
      expect(merge([{ a: 0 }, { b: false }, { c: NaN }])).toEqual({ a: 0, b: false, c: NaN });
    });

    // 7. Symbol keys
    it('merges dictionaries with symbol keys', () => {
      const sym = Symbol('test');
      const result = merge([{ [sym]: 'value' }, { a: 1 }]);
      expect(result[sym]).toBe('value');
      expect((result as any).a).toBe(1);
    });

    // 8. Many dictionaries
    it('merges a large number of dictionaries', () => {
      const dicts = Array.from({ length: 100 }, (_, i) => ({ [`key${i}`]: i }));
      const result = merge(dicts);
      expect(Object.keys(result)).toHaveLength(100);
      expect((result as any).key0).toBe(0);
      expect((result as any).key99).toBe(99);
    });

    // 9. Partial overlapping keys across many dicts
    it('correctly handles partial overlaps across multiple dictionaries', () => {
      const result = merge([
        { a: 1, b: 2 },
        { b: 3, c: 4 },
        { c: 5, d: 6 },
      ]);
      expect(result).toEqual({ a: 1, b: 3, c: 5, d: 6 });
    });

    // 10. Does not mutate input dictionaries
    it('does not mutate the input dictionaries', () => {
      const dict1 = { a: 1 };
      const dict2 = { b: 2 };
      merge([dict1, dict2]);
      expect(dict1).toEqual({ a: 1 });
      expect(dict2).toEqual({ b: 2 });
    });
  });
});