import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseExportAssignment(exportAssign: any): abstracts.translators.AstType[] {
  const expression = exportAssign.getExpression();

  if (!expression) {
    return [];
  }

  // 1. Если экспортируемое выражение является объявлением/биндингом (например: export default function() {})
  if (tsRl.ast.bindings.isBindings(expression)) {
    const res = tsRl.ast.bindings.parse(expression);
    return Array.isArray(res) ? res : [res];
  }

  // 2. Если это выражение (например: export default myFunction; или export default { a: 1 })
  // В зависимости от архитектуры tsRl, парсим как expression или statement:
  if (tsRl.ast.expressions && tsRl.ast.expressions.isExpression?.(expression)) {
    const res = tsRl.ast.expressions.parse(expression);
    return Array.isArray(res) ? res : [res];
  }

  // 3. Fallback: если выражение может быть распаршено общим парсером выражений/стейтментов
  if (tsRl.ast.statements.isStatement(expression)) {
    return [tsRl.ast.statements.parse(expression)];
  }

  // Опционально: если требуется явно сформировать AST-узел экспорта по умолчанию
  return [{
    kind: 'ExportAst' as any, // или соответствующий узел вашей AST-схемы
    syntaxLayer: 3,
    isDefault: !exportAssign.isExportEquals(),
    expression: tsRl.ast.expressions ? tsRl.ast.expressions.parse(expression) : expression.getText()
  } as any];
}
