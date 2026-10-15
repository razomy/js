import * as resources from '@razomy/resources';
import * as abstractions from '@razomy/abstractions';

export function optinal<C extends abstractions.patterns.IContext, R, D>(
  ctx: C,
  rule: resources.ResultNullFn<C, R>,
  default_: D,
): D | R {
  const res = rule(ctx);
  return res === null ? default_ : res;
}
// todo:remove
