import * as tsRl from '@razomy/ts-rl';
import * as abstractions from '@razomy/abstractions';

/**
 * PHASE 3: Устанавливает связи parent, prev, next и children
 * Обязательно вызываем после генерации сырого HIR.
 */
export function linkHirTree(
  ctx: tsRl.hir.SemanticContext,
  node: abstractions.translator.HirnType,
  parent: abstractions.translator.HirnType | null = null,
  prev: abstractions.translator.HirnType | null = null,
  next: abstractions.translator.HirnType | null = null,
): void {
  node.parent = parent;
  node.prev = prev;
  node.next = next;
  node.children = [];

  tsRl.hir.iterator.walkHirChildren(
    node,
    (child) => {
      node.children.push(child);
      // Для одиночных узлов (например block или returnShape) prev/next нет
      linkHirTree(ctx, child, node, null, null);
    },
    (children) => {
      // Для массивов вычисляем соседей
      for (let i = 0; i < children.length; i++) {
        node.children.push(children[i]);
        linkHirTree(
          ctx,
          children[i],
          node,
          i > 0 ? children[i - 1] : null,
          i < children.length - 1 ? children[i + 1] : null,
        );
      }
    },
  );
}
