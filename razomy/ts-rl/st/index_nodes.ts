import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function indexNodes(
  ctx: tsRl.st.SemanticContext,
  node: abstracts.translators.ISemanticNode
): void {
  ctx.set(node.hir);

  tsRl.st.walkHirChildren(
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
