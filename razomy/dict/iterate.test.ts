import { iterate } from './iterate';

describe('dictionary', () => {
  describe('iterate', () => {
    // 1. Standard cases
    it('iterates over all key-value pairs in the dictionary', () => {
      const logs: Array<[string, number]> = [];
      iterate({ a: 1, b: 2, c: 3 }, (value, key) => {
        logs.push([key, value as number]);
      });
      expect(logs).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('returns the original dictionary', () => {
      const dict = { a: 1, b: 2 };
      const result = iterate(dict, () => {});
      expect(result).toBe(dict);
    });

    // 2. Empty dictionary
    it('handles an empty dictionary without invoking the iteratee', () => {
      let callCount = 0;
      const result = iterate({}, () => {
        callCount++;
      });
      expect(callCount).toBe(0);
      expect(result).toEqual({});
    });

    // 3. Callback arguments
    it('passes the correct arguments to the iteratee (value, key, dict)', () => {
      const dict = { x: 10, y: 20 };
      const args: Array<[unknown, string, typeof dict]> = [];

      iterate(dict, (value, key, d) => {
        args.push([value, key, d]);
      });

      expect(args).toEqual([
        [10, 'x', dict],
        [20, 'y', dict],
      ]);
    });

    // 4. Early termination (short-circuiting)
    it('stops iterating when the iteratee returns false', () => {
      const logs: number[] = [];
      iterate({ x: 10, y: 20, z: 30 }, (value) => {
        if ((value as number) >= 20) return false;
        logs.push(value as number);
        return;
      });
      expect(logs).toEqual([10]);
    });

    it('does not stop iterating for other falsy return values', () => {
      const logs: Array<[string, unknown]> = [];
      iterate({ a: 1, b: 2, c: 3 }, (value, key) => {
        logs.push([key, value]);
        return undefined;
      });
      expect(logs).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('does not stop iterating when iteratee returns 0', () => {
      const logs: string[] = [];
      iterate({ a: 1, b: 2 }, (_value, key) => {
        logs.push(key);
        return 0;
      });
      expect(logs).toEqual(['a', 'b']);
    });

    it('does not stop iterating when iteratee returns null', () => {
      const logs: string[] = [];
      iterate({ a: 1, b: 2 }, (_value, key) => {
        logs.push(key);
        return null;
      });
      expect(logs).toEqual(['a', 'b']);
    });

    it('does not stop iterating when iteratee returns empty string', () => {
      const logs: string[] = [];
      iterate({ a: 1, b: 2 }, (_value, key) => {
        logs.push(key);
        return '';
      });
      expect(logs).toEqual(['a', 'b']);
    });

    // 5. Single entry dictionary
    it('works correctly with a single entry dictionary', () => {
      const logs: Array<[string, number]> = [];
      iterate({ only: 42 }, (value, key) => {
        logs.push([key, value as number]);
      });
      expect(logs).toEqual([['only', 42]]);
    });

    // 6. Early termination on first element
    it('stops on the first element if iteratee returns false immediately', () => {
      let callCount = 0;
      iterate({ a: 1, b: 2, c: 3 }, () => {
        callCount++;
        return false;
      });
      expect(callCount).toBe(1);
    });

    // 7. Complex data types as values
    it('works correctly with complex value types', () => {
      const dict = {
        user: { name: 'Alice', age: 30 },
        settings: { theme: 'dark' },
      };
      const keys: string[] = [];
      const values: unknown[] = [];

      iterate(dict, (value, key) => {
        keys.push(key);
        values.push(value);
      });

      expect(keys).toEqual(['user', 'settings']);
      expect(values).toEqual([{ name: 'Alice', age: 30 }, { theme: 'dark' }]);
    });

    // 8. Only iterates own enumerable string-keyed properties
    it('only iterates own enumerable properties', () => {
      const parent = { inherited: true };
      const child = Object.create(parent);
      child.own = 'value';

      const logs: string[] = [];
      iterate(child, (_value, key) => {
        logs.push(key);
      });

      expect(logs).toEqual(['own']);
      expect(logs).not.toContain('inherited');
    });

    // 9. Dictionary with various value types
    it('handles dictionaries with mixed value types', () => {
      const dict = { str: 'hello', num: 42, bool: true, nil: null, undef: undefined };
      const collected: Array<[string, unknown]> = [];

      iterate(dict, (value, key) => {
        collected.push([key, value]);
      });

      expect(collected).toEqual([
        ['str', 'hello'],
        ['num', 42],
        ['bool', true],
        ['nil', null],
        ['undef', undefined],
      ]);
    });

    // 10. Returns the object-coerced version for primitives (edge case with Object())
    it('returns the result of Object(dict)', () => {
      const dict = { a: 1 };
      const result = iterate(dict, () => {});
      expect(result).toBe(dict);
    });
  });
});
