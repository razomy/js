import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function joinDocs(ctx: tsRl.hir.HirCtx, node: abstracts.translators.HirType): void {
  // 1. Бизнес-логика текущей фазы
  if (node.kind === 'FunctionHir') {
    const docs = node.prev
    if (docs && docs.kind === 'BlockHir' && docs.syntaxLayer === 1) {
      const statements = (docs.statements || []) as abstracts.translators.BindingHir<abstracts.translators.LiteralHir>[];
      node.title = statements.find(i => i.name === 'title')?.value || null;
      node.description = statements.find(i => i.name === 'description')?.value || null;
      node.examples = statements.find(i => i.name === 'examples')?.value || null;

      const params = node.parameters || [];
      for (const param of params) {
        for (const paramDoc of statements) {
          if (param.name === (paramDoc as any)?.name) {
            param.description = paramDoc.value;
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
