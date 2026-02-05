import {BoolExecute} from '@razomy/pipes.booleans';
import {Iterate, IterateBreaks, iterateVrd} from './iterate_vrd';

export function iterateSkip<T, C extends Iterate<T>>(ctx: C, isIterateChildExecuteBool: BoolExecute<C> | ((ctx: C) => void)): void {
  iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c)
      ? IterateBreaks.None
      : IterateBreaks.Skip
  })
}
