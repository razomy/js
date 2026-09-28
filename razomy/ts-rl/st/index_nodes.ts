import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function indexNodes(
  ctx: tsRl.sg.HirCtx,
  node: abstracts.translators.HirType
): void {
  ctx.nodes.set(node.id, node);

  tsRl.sg.walkHirChildren(
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
