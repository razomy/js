import * as tsRl from '@razomy/ts-rl';
import * as abstractions from '@razomy/abstractions';

export function indexNodes(
  ctx: tsRl.hir.SemanticContext,
  node: abstractions.translator.HirnType,
): void {
  ctx.hirnMap.set(node.id, node);

  tsRl.hir.iterator.walkHirChildren(
    node,
    (child) => {
      indexNodes(ctx, child);
    },
    (children) => {
      for (let i = 0; i < children.length; i++) {
        indexNodes(ctx, children[i]);
      }
    },
  );
}
