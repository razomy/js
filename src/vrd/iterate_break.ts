import * as functionBooleans from '@razomy/function-booleans';
import * as vrd from '@razomy/vrd';

export function iterateBreak<T, C extends vrd.Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: functionBooleans.BoolExecute<[C]>,
): void {
  vrd.iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c) ? vrd.IterateBreaks.None : vrd.IterateBreaks.Break;
  });
}
