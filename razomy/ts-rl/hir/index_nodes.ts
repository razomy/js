import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function indexNodes(
  ctx: tsRl.hir.HirCtx,
  node: abstracts.translators.HirType
): void {
  ctx.nodes.set(node.id, node);

  tsRl.hir.walkHirChildren(
    node,
    (child) => {
      indexNodes(ctx, child);
    },
    (children) => {
      for (let i = 0; i < children.length; i++) {
        indexNodes(
          ctx,
          children[i],
        );
      }
    }
  );
}
