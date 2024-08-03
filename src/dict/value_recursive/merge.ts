import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";

export function merge<T>(a: ValueRecursiveDictOrValue<T>, b: ValueRecursiveDictOrValue<T>, empty: T): ValueRecursiveDictOrValue<T> {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }

  const is_a = is_value_recursion(a);
  const is_b = is_value_recursion(b);

  if (is_a) {
    if (is_b) {
      return merge_dict(a, b, empty);
    }
    a[b as string] = empty;
    return a;
  } else {
    if (is_b) {
      b[a as string] = empty;
      return b;
    }
    return new ValueRecursiveDict({[a as string]: '', [b as string]: ''});
  }
}

export function merge_dict<T>(a: ValueRecursiveDict<T>, b: ValueRecursiveDict<T>, empty: T): ValueRecursiveDict<T> {
  const a_keys = Object.keys(a);
  const b_keys = Object.keys(b);
  const all_keys = new Set([...a_keys, ...b_keys]);
  for (let key of all_keys) {
    a[key] = merge(a[key], b[key], empty);
  }
  return a;
}
