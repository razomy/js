import { BinaryExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseBinary(node: BinaryExpression): abstracts.translators.BinaryExpression {
  // Получаем текстовое представление оператора (например, "+", "===", "<=")
  const operatorText = node.getOperatorToken().getText();

  return {
    kind: 'BinaryExpression',
    operator: operatorText as any, // Приводим к any, так как TS-строка должна попасть в ваш union
    left: tsLang.ast.expressions.parse(node.getLeft())!,
    right: tsLang.ast.expressions.parse(node.getRight())!,
  };
}
