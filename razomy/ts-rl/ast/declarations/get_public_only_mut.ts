import * as abstracts from '@razomy/abstracts';

/**
 * Рекурсивно очищает тела функций, оставляя только сигнатуры (AST-интерфейсы).
 * Полезно для генерации "заголовочных" файлов или публичных API.
 */
export function getPublicOnlyMut<T extends abstracts.translators.AstType>(node: T): T {
  if (!node) return node;

  // Если это функция, удаляем внутренности её блока
  if (node.kind === 'FunctionAst') {
    (node as abstracts.translators.FunctionAst).block.statements = [];
  }

  // Если это лямбда (стрелочная функция), тоже удаляем тело
  if (node.kind === 'LambdaAst') {
    if (node.block) {
      node.block.statements = [];
    }
  }

  // Если это модуль (включая Root пакет), рекурсивно проходимся по его телу
  if (node.kind === 'ModuleAst') {
    const mod = node as abstracts.translators.ModuleAst;
    mod.block.statements = mod.block.statements.map((stmt) => getPublicOnlyMut(stmt));
  }

  // Если это просто блок (например, внутри If/While), можно при желании очищать и его,
  // но обычно getPublicOnlyMut применяется на верхнем уровне модуля.
  if (node.kind === 'BlockAst') {
    const block = node as abstracts.translators.BlockAst;
    block.statements = block.statements.map((stmt) => getPublicOnlyMut(stmt));
  }

  return node;
}
