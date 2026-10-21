import * as abstractions from '@razomy/abstractions';
import * as tsHir from '@razomy/ts-hir';
import type { IIdentityHirn } from '@razomy/abstractions/hir';

/**
 * Удаляет неиспользуемые объявления переменных.
 * ВАЖНО: вызывается ПОСЛЕ resolveReferences!
 */
export function removePrivateDeclarations(node: abstractions.hir.HirnType): void {
  if (node.kind === 'ModuleHirn') {
    node.properties = node.properties.filter((i) => (i as IIdentityHirn).modifiers?.isPublic === true);
  }

  // Продолжаем обход для вложенных блоков/функций
  tsHir.hir.iterator.walkHirChildren(
    node,
    (child) => removePrivateDeclarations(child),
    (children) => {},
  );
}
