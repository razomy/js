import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

export function joinDocs(ctx: tsRl.st.SemanticContext, sNode: abstracts.translators.ISemanticNode): void {
  const node = sNode.hir;
  // 1. Бизнес-логика текущей фазы
  if (node.kind === 'FunctionHir') {
    const docs = sNode.prev?.hir ;
    if (docs && docs.kind === 'BlockHir' && docs.syntaxRole === 'declaration') {
      const statements = (docs.statements || []) as abstracts.translators.BindingHir<abstracts.translators.LiteralHir>[];
      node.doc.title = statements.find(i => i.name === 'title')?.value?.value || null;
      node.doc.description = statements.find(i => i.name === 'description')?.value?.value || null;
      node.doc.examples = statements.find(i => i.name === 'examples')?.value?.value || null;

      const params = node.parameters || [];
      for (const param of params) {
        for (const paramDoc of statements) {
          if (param.name === (paramDoc as any)?.name) {
            param.doc.description = paramDoc.value?.value;
          }
        }
      }
    }
  }

  // 2. Рекурсивно проталкиваем проход дальше вглубь
  tsRl.st.walkHirChildren(
    sNode,
    (child) => joinDocs(ctx, child),
    (children) => {
      for (const child of children) joinDocs(ctx, child);
    }
  );
}
