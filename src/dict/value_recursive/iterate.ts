import {is_value_recursion, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {Execute} from "razomy.js/pipes/booleans/execute";

interface Iterate<T> {
  parents: string[];
  input: ValueRecursiveDictOrValue<T>;
}

export enum IterateBreaks {
  None = 0,
  Skip = 1,
  Break = 2,
}

export function iterate<T, C extends Iterate<T>>(
  ctx: C,
  is_iterate_child_execute_bool: (ctx: C) => IterateBreaks,
): IterateBreaks {
  const result = is_iterate_child_execute_bool(ctx);
  if (result === IterateBreaks.Skip) {
    return result;
  }
  if (result === IterateBreaks.Break) {
    return result;
  }

  if (is_value_recursion(ctx.input)) {
    for (let inputKey in ctx.input) {
      const parents = ctx.parents;
      const value = ctx.input[inputKey];
      ctx.parents = [...parents, inputKey];
      ctx.input = value;

      const result = iterate(ctx, is_iterate_child_execute_bool);
      if (result === IterateBreaks.Break) {
        return result;
      }
    }
  }
  return IterateBreaks.None;
}


export function iterate_break<T, C extends Iterate<T>>(
  ctx: C,
  is_iterate_child_execute_bool: Execute<C>
): void {
  iterate(ctx, (c) => {
    return is_iterate_child_execute_bool(c)
      ? IterateBreaks.None
      : IterateBreaks.Break
  })
}
