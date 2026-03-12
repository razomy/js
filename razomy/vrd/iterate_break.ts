import { type Iterate, IterateBreaks, iterateVrd } from './iterate_vrd';
import * as pipesBooleans from '@razomy/pipes-booleans';

export function iterateBreak<T, C extends Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: pipesBooleans.BoolExecute<C>,
): void {
  iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c) ? IterateBreaks.None : IterateBreaks.Break;
  });
}
