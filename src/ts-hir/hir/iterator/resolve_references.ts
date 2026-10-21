import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

export function resolveReferences(
  ctx: tsHir.hir.SemanticContext,
  node: abstractions.hir.HirnType,
  scope: Map<string, abstractions.hir.HirnType> = new Map(),
): void {
  // Копируем скоуп для текущего уровня видимости (лексическое замыкание)
  const currentScope = new Map(scope);

  // 1. Hoisting-фаза: сначала регистрируем все объявления на текущем уровне
  function registerDeclaration (item: abstractions.hir.HirnType) {
        if ('name' in item && typeof (item as any).name === 'string' && (item as any).name) {
          currentScope.set((item as any).name, item);
        }
      }

  if (node.kind === 'BlockHirn') {
    for (const stmt of node.statements) {
      registerDeclaration(stmt);
    }
  } else if (node.kind === 'StructHirn') {
    for (const prop of node.properties) {
      registerDeclaration(prop);
    }
  } else if (node.kind === 'FunctionHirn') {
    for (const param of node.parameters) {
      registerDeclaration(param);
    }
  }

  // 2. Разрешение, если текущий узел — ReferenceSn
  if (node.kind === 'ReferenceHirn') {
    const ref = node as tsHir.hir.ReferenceSn;
    const name = ref.getSymbolName();

    if (name && currentScope.has(name)) {
      const decl = currentScope.get(name)!;
      ref.resolvedDeclaration = decl;

      // Если ссылка указывает на объявление типа/интерфейса, ее слой становится 'shape'
      if (decl.kind === 'StructHirn' && decl.semanticLayer === 'shape') {
        ref.semanticLayer = 'shape';
      }
    }
  }

  // 3. Рекурсивный проход по дочерним узлам с обновленным scope
  tsHir.hir.iterator.walkHirChildren(
    node,
    (child) => resolveReferences(ctx, child, currentScope),
    (children) => {
      for (const child of children) {
        resolveReferences(ctx, child, currentScope);
      }
    },
  );
}
