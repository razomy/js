import * as tsRl from '@razomy/ts-rl';
import * as abstractions from '@razomy/abstractions';

export function joinDocs(
  ctx: tsRl.hir.SemanticContext,
  node: abstractions.translator.HirnType,
): void {
  // 1. Бизнес-логика текущей фазы
  if (node.kind === 'FunctionHirn') {
    const docs = node.prev as abstractions.translator.HirnType | null;
    if (
      docs &&
      docs.kind === 'BlockHirn' &&
      (docs.syntaxRole === 'text' || docs.syntaxRole === 'declaration')
    ) {
      const statements = (docs.statements || []) as abstractions.translator.BindingHirn<abstractions.translator.LiteralHirn>[];

      node.doc.title = statements.find((i) => i.name === 'title')?.value?.value ?? null;
      node.doc.description = statements.find((i) => i.name === 'description')?.value?.value ?? null;
      node.doc.returnDescription = statements.find((i) => i.name === 'returns' || i.name === 'return')?.value?.value ?? null;
      node.doc.examples = statements.find((i) => i.name === 'examples')?.value?.value ?? [];

      const params = node.parameters || [];
      for (const param of params) {
        for (const paramDoc of statements) {
          if (param.name && param.name === paramDoc.name) {
            if (!param.doc) {
              param.doc = { description: '' };
            }
            param.doc.description = paramDoc.value?.value ?? '';
          }
        }
      }
    }
  }

  // 2. Рекурсивно проталкиваем проход дальше вглубь
  tsRl.hir.iterator.walkHirChildren(
    node,
    (child) => joinDocs(ctx, child),
    (children) => {
      for (const child of children) joinDocs(ctx, child);
    },
  );
}
