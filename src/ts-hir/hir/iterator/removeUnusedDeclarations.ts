import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

/**
 * Удаляет неиспользуемые объявления переменных.
 * ВАЖНО: вызывается ПОСЛЕ resolveReferences!
 */
export function removeUnusedDeclarations(
  root: abstractions.hir.HirnType,
): void {
  // 1. Собираем все объявления, на которые реально есть ссылки
  const usedDeclarations = new Set<abstractions.hir.HirnType>();

  function collectUsages(node: abstractions.hir.HirnType) {
    if (node.kind === 'ReferenceHirn') {
      const ref = node as tsHir.hir.ReferenceSn;
      if (ref.resolvedDeclaration) {
        usedDeclarations.add(ref.resolvedDeclaration);
      }
    }

    tsHir.hir.iterator.walkHirChildren(
      node,
      (child) => collectUsages(child),
      (children) => {
        for (const child of children) {
          collectUsages(child);
        }
      },
    );
  }

  // Запускаем сбор ссылок
  collectUsages(root);

  // 2. Рекурсивно фильтруем стейтменты внутри блоков
  function prune(node: abstractions.hir.HirnType) {
    if (node.kind === 'BlockHirn') {
      const block = node as any; // при необходимости замени на конкретный тип BlockHirn

      if (Array.isArray(block.statements)) {
        block.statements = block.statements.filter((stmt: any) => {
          // Проверяем, является ли узел именованным объявлением
          const isNamedDeclaration =
            stmt &&
            'name' in stmt &&
            typeof stmt.name === 'string' &&
            stmt.name.length > 0;

          if (isNamedDeclaration) {
            // Если узел экспортирован (если в вашей модели есть флаг isExported), его удалять нельзя
            if (stmt.isPublic) {
              return true;
            }

            // Если переменная не используется — удаляем (возвращаем false)
            if (!usedDeclarations.has(stmt)) {
              return false;
            }
          }

          return true;
        });
      }
    }

    // Продолжаем обход для вложенных блоков/функций
    tsHir.hir.iterator.walkHirChildren(
      node,
      (child) => prune(child),
      (children) => {
        for (const child of children) {
          prune(child);
        }
      },
    );
  }

  // Запускаем очистку
  prune(root);
}
