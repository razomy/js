import {VrdOrValue} from 'razomy.vrd/vrd';
import {isVrd} from './is_vrd';

export interface Iterate<T> {
  parents: string[];
  input: VrdOrValue<T>;
}

export enum IterateBreaks {
  None = 0,
  Skip = 1,
  Break = 2,
}

export function iterateVrd<T, C extends Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: (ctx: C) => IterateBreaks,
): IterateBreaks {
  const result = isIterateChildExecuteBool(ctx);
  if (result === IterateBreaks.Skip) {
    return result;
  }
  if (result === IterateBreaks.Break) {
    return result;
  }

  const input = ctx.input;
  const parents = ctx.parents;
  if (isVrd(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      ctx.parents = [...parents, inputKey];
      ctx.input = value;

      const result = iterateVrd(ctx, isIterateChildExecuteBool);
      if (result === IterateBreaks.Break) {
        return result;
      }
    }
  }
  return IterateBreaks.None;
}


