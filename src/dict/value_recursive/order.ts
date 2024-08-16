import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";

export function order<T, T2>(a: ValueRecursiveDictOrValue<T>, b: ValueRecursiveDictOrValue<T2>): ValueRecursiveDictOrValue<T2> {
  if (is_value_recursion(a) && is_value_recursion(b)) {
    const order_b = new ValueRecursiveDict<T2>({});
    for (let key in a) {
      if (b[key] !== undefined) {
        order_b[key] = order(a[key], b[key]);
        delete b[key];
      }
    }

    for (let key in b) {
      order_b[key] = b[key];
    }

    return order_b;
  }

  return b;
}