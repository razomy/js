import * as translators from '@razomy/abstracts/translators';

/**
 * Рекурсивно очищает тела функций, оставляя только сигнатуры (AST-интерфейсы).
 * Полезно для генерации "заголовочных" файлов или публичных API.
 */
export function getPublicOnlyMut<T extends translators.AstType>(node: T): T {
  if (!node) return node;

  // Если это функция, удаляем внутренности её блока
  if (node.kind === 'FunctionAst') {
    (node as translators.FunctionAst).block.statements = [];
  }

  // Если это лямбда (стрелочная функция), тоже удаляем тело
  if (node.kind === 'LambdaAst') {
    (node as translators.LambdaAst).block.statements = [];
  }

  // Если это модуль (включая Root пакет), рекурсивно проходимся по его телу
  if (node.kind === 'ModuleAst') {
    const mod = node as translators.ModuleAst;
    mod.block.statements = mod.block.statements.map(stmt => getPublicOnlyMut(stmt));
  }

  // Если это просто блок (например, внутри If/While), можно при желании очищать и его, 
  // но обычно getPublicOnlyMut применяется на верхнем уровне модуля.
  if (node.kind === 'BlockAst') {
    const block = node as translators.BlockAst;
    block.statements = block.statements.map(stmt => getPublicOnlyMut(stmt));
  }

  return node;
}
