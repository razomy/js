import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function joinDocs(ctx: tsRl.hir.HirCtx, node: abstracts.translators.HirType): void {
  // 1. Бизнес-логика текущей фазы
  if (node.kind === 'FunctionHir') {
    const docs = tsRl.hir.getEdge(ctx, node, 'prev');

    if (docs?.kind === 'BlockHir' && docs.syntaxLayer === 1) {
      tsRl.hir.addEdge(ctx, node, docs, 'description')
      // Защита от пустых массивов на всякий случай
      const params = node.parameters || [];
      const statements = docs.statements || [];

      for (const child of params) {
        for (const doc of statements) {
          if (child.name === (doc as any)?.name) {
            tsRl.hir.addEdge(ctx, child, doc, 'description')
          }
        }
      }
    }
  }

  // 2. Рекурсивно проталкиваем проход дальше вглубь
  tsRl.hir.walkHirChildren(
    node,
    (child) => joinDocs(ctx, child),
    (children) => {
      for (const child of children) joinDocs(ctx, child);
    }
  );
}
