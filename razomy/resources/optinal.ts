import * as resources from '@razomy/resources';
import * as abstracts from '@razomy/abstracts';

export function optinal<C extends abstracts.structures.Context, R, D>(
  ctx: C,
  rule: resources.ResultNullFn<C, R>,
  default_: D,
): D | R {
  const res = rule(ctx);
  return res === null ? default_ : res;
}
