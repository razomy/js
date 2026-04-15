import * as pipesBooleans from '@razomy/pipes-booleans';
import * as vrd from "@razomy/vrd";

export function iterateBreak<T, C extends vrd.Iterate<T>>(
  ctx: C,
  isIterateChildExecuteBool: pipesBooleans.BoolExecute<C>,
): void {
  vrd.iterateVrd(ctx, (c) => {
    return isIterateChildExecuteBool(c) ? vrd.IterateBreaks.None : vrd.IterateBreaks.Break;
  });
}
