import type {BoolExecute} from '@razomy/pipes-booleans';
import {type Iterate, IterateBreaks, iterateVrd} from './iterate_vrd';

export function iterateBreak<T, C extends Iterate<T>>(ctx: C, isIterateChildExecuteBool: BoolExecute<C>): void {
  iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c)
      ? IterateBreaks.None
      : IterateBreaks.Break
  })
}
