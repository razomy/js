import * as tsRl from "@razomy/ts-rl";
import * as abstracts from "@razomy/abstracts";

/**
 * PHASE 3: Устанавливает связи parent, prev, next
 * Обязательно вызываем после генерации сырого HIR.
 */
export function linkHirTree(
  ctx: tsRl.hir.HirCtx,
  node: abstracts.translators.HirType,
  parent: abstracts.translators.HirType | null = null,
  prev: abstracts.translators.HirType | null = null,
  next: abstracts.translators.HirType | null = null
): void {
  if (parent) node.parent = parent
  if (prev) node.prev = prev
  if (next) node.next = next

  // 2. Рекурсивно обходим детей с помощью нашей компактной утилиты
  tsRl.hir.walkHirChildren(
    node,
    (child) => {
      // Для одиночных узлов (например block или returnShape) prev/next нет
      linkHirTree(ctx, child, node, null, null);
    },
    (children) => {
      // Для массивов вычисляем соседей
      for (let i = 0; i < children.length; i++) {
        linkHirTree(
          ctx,
          children[i],
          node,
          i > 0 ? children[i - 1] : null,
          i < children.length - 1 ? children[i + 1] : null
        );
      }
    }
  );
}
