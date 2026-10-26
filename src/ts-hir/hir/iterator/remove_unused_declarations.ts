import * as abstractions from '@razomy/abstractions';
import * as tsHir from "@razomy/ts-hir";

/**
 * Вспомогательный тайпгард для проверки, является ли узел декларацией (IdentityHirnType).
 */
function isIdentityHirn(node: abstractions.hir.HirnType): node is abstractions.hir.IdentityHirnType {
  return (
    node.kind === 'BindingHirn' ||
    node.kind === 'FunctionHirn' ||
    node.kind === 'ModuleHirn' ||
    node.kind === 'StructHirn'
  );
}

/**
 * Удаляет неиспользуемые объявления (BindingHirn, StructHirn, FunctionHirn).
 * Вызывается ПОСЛЕ resolveReferences и (опционально) ПОСЛЕ inlineReferences!
 */
export function removeUnusedDeclarations(root: abstractions.hir.HirnType): void {
  const usedDeclarations = new Set<abstractions.hir.IdentityHirnType>();

  // 1. Собираем все объявления, на которые реально ссылаются узлы VarRefHirn
  function collectUsages(node: abstractions.hir.HirnType): void {
    if (!node) return;

    // if (node.kind === 'VarRefHirn') {
    //   if (node.resolvedDeclaration && isIdentityHirn(node.resolvedDeclaration)) {
    //     usedDeclarations.add(node.resolvedDeclaration);
    //   }
    // }

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

  collectUsages(root);

  // Проверка, нужно ли оставить узел в блоке/модуле
  function shouldKeepStatement(stmt: abstractions.hir.HirnType): boolean {
    if (isIdentityHirn(stmt)) {
      // Анонимные элементы (например, элементы кортежей или лямбды без имени) не трогаем
      if (stmt.name !== null && stmt.name.length > 0) {
        // Экспортируемые (публичные) декларации удалять нельзя
        if (stmt.modifiers.isPublic === true) {
          return true;
        }
        // Если на декларацию никто не ссылается — удаляем
        if (!usedDeclarations.has(stmt)) {
          return false;
        }
      }
    }
    return true;
  }

  // 2. Рекурсивно фильтруем стейтменты внутри BlockHirn и ModuleHirn
  function prune(node: abstractions.hir.HirnType): void {
    switch (node.kind) {
      case 'BlockHirn':
        node.statements = node.statements.filter(shouldKeepStatement);
        break;

      case 'ModuleHirn':
        node.statements = node.statements.filter(shouldKeepStatement);
        break;
    }

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

  prune(root);
}
