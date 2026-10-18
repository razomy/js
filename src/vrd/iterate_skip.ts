import * as functionBooleans from '@razomy/function-booleans';
import * as vrd from '@razomy/vrd';

export function iterateSkip<T, C extends vrd.Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: functionBooleans.BoolExecute<[C]> | ((ctx: C) => void),
): void {
  vrd.iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c) ? vrd.IterateBreaks.None : vrd.IterateBreaks.Skip;
  });
}
