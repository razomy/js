import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export function indexNodes(
  ctx: tsHir.hir.SemanticContext,
  node: abstractions.hir.HirnType,
): void {
  ctx.hirnMap.set(node.id, node);

  tsHir.hir.iterator.walkHirChildren(
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
