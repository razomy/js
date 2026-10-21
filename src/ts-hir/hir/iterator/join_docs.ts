import * as abstractions from '@razomy/abstractions';
import * as tsHir from '@razomy/ts-hir';
import type { LiteralHirn } from '@razomy/abstractions/hir';

export function joinDocs(ctx: tsHir.hir.SemanticContext, node: abstractions.hir.HirnType): void {
  // 1. Бизнес-логика текущей фазы
  if (node.kind === 'FunctionHirn') {
    const docs = node.prev as abstractions.hir.HirnType | null;
    if (docs && docs.kind === 'BlockHirn' && (docs.syntaxRole === 'text' || docs.syntaxRole === 'declaration')) {
      const statements = (docs.statements || []) as abstractions.hir.BindingHirn<abstractions.hir.LiteralHirn>[];

      node.doc.title = statements.find((i) => i.name === 'title')?.value?.value ?? null;
      node.doc.description = statements.find((i) => i.name === 'description')?.value?.value ?? null;
      node.doc.returnDescription =
        statements.find((i) => i.name === 'returns' || i.name === 'return')?.value?.value ?? null;
      node.doc.examples = statements
        .filter((i) => i.name === 'example')
        .map((i) => ({
          code: (i.value?.children[0] as LiteralHirn)?.value,
          expected: (i.value?.children[1] as LiteralHirn)?.value,
        }));

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
  tsHir.hir.iterator.walkHirChildren(
    node,
    (child) => joinDocs(ctx, child),
    (children) => {
      for (const child of children) joinDocs(ctx, child);
    },
  );
}
