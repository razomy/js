import * as abstractions from '@razomy/abstractions';
import * as tsHir from '@razomy/ts-hir';

/**
 * Удаляет неиспользуемые объявления переменных.
 * ВАЖНО: вызывается ПОСЛЕ resolveReferences!
 */
export function removePrivateDeclarations(node: abstractions.hir.HirnType): void {
  if (node.kind === 'ModuleHirn') {
    node.statements = node.statements.filter((i) => (i as abstractions.hir.IIdentityHirn).modifiers?.isPublic === true);
  }

  if (node.kind === 'BlockHirn') {
    node.statements = []
  }

  // Продолжаем обход для вложенных блоков/функций
  tsHir.hir.iterator.walkHirChildren(
    node,
    (child) => removePrivateDeclarations(child),
    (children) => {
      for (const child of children) {
        removePrivateDeclarations(child);
      }
    },
  );
}
