import { type Iterate, IterateBreaks, iterateVrd } from './iterate_vrd';
import * as pipesBooleans from '@razomy/pipes-booleans';

export function iterateSkip<T, C extends Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: pipesBooleans.BoolExecute<C> | ((ctx: C) => void),
): void {
  iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c) ? IterateBreaks.None : IterateBreaks.Skip;
  });
}
