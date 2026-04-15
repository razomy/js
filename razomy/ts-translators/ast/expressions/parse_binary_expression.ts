import { BinaryExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseBinaryExpression(node: BinaryExpression): abstracts.translators.BinaryExpression {
  // Получаем текстовое представление оператора (например, "+", "===", "<=")
  const operatorText = node.getOperatorToken().getText();

  return {
    kind: 'BinaryExpression',
    operator: operatorText as any, // Приводим к any, так как TS-строка должна попасть в ваш union
    left: tsTranslators.ast.expressions.parseExpression(node.getLeft())!,
    right: tsTranslators.ast.expressions.parseExpression(node.getRight())!,
  };
}
