import {VrdOrValue} from 'razomy.vrd/vrd';
import is_vrd from './is_vrd';

export interface Iterate<T> {
  parents: string[];
  input: VrdOrValue<T>;
}

export enum IterateBreaks {
  None = 0,
  Skip = 1,
  Break = 2,
}

export default function iterate_vrd<T, C extends Iterate<T>>(
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

  const input = ctx.input;
  const parents = ctx.parents;
  if (is_vrd(input)) {
    for (let input_key in input) {
      const value = input[input_key];
      ctx.parents = [...parents, input_key];
      ctx.input = value;

      const result = iterate_vrd(ctx, is_iterate_child_execute_bool);
      if (result === IterateBreaks.Break) {
        return result;
      }
    }
  }
  return IterateBreaks.None;
}


