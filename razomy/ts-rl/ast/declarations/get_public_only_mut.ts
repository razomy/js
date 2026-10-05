import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

/**
 * Рекурсивно очищает тела функций, оставляя только сигнатуры (AST-интерфейсы).
 * Полезно для генерации "заголовочных" файлов или публичных API.
 */
export function getPublicOnlyMut<T extends abstracts.translators.AsnType>(node: T, ctx: tsRl.ast.HasEnterLeaveProduce): T {
  if (!node) return node;

  // Если это функция, удаляем внутренности её блока
  if (node.kind === 'FunctionAsn') {
    (node as abstracts.translators.FunctionAsn).block.statements = [];
  }

  // Если это лямбда (стрелочная функция), тоже удаляем тело
  if (node.kind === 'LambdaAsn') {
    if (node.block) {
      node.block.statements = [];
    }
  }

  // Если это модуль (включая Root пакет), рекурсивно проходимся по его телу
  if (node.kind === 'ModuleAsn') {
    const mod = node as abstracts.translators.ModuleAsn;
    mod.block.statements = mod.block.statements.map((stmt) => getPublicOnlyMut(stmt, ctx));
  }

  // Если это просто блок (например, внутри If/While), можно при желании очищать и его,
  // но обычно getPublicOnlyMut применяется на верхнем уровне модуля.
  if (node.kind === 'BlockAsn') {
    const block = node as abstracts.translators.BlockAsn;
    block.statements = block.statements.map((stmt) => getPublicOnlyMut(stmt, ctx));
  }

  return node;
}
