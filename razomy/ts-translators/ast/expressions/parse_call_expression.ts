import { CallExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseCallExpression(node: CallExpression): abstracts.translators.CallExpression {
  const expressionNode = node.getExpression();

  // Имя вызываемой функции (например, "calculateTotal")
  let identifier: abstracts.translators.Identifier | null = null;

  if (expressionNode.getKindName() === 'Identifier') {
    identifier = {
      kind: 'Identifier',
      name: expressionNode.getText(),
    };
  } else {
    // Обработка сложных вызовов, вроде console.log() или arr[0]()
    // Пока записываем текст, чтобы не терять данные в рамках вашего текущего интерфейса
    identifier = {
      kind: 'Identifier',
      name: expressionNode.getText(),
    };
  }

  // Парсим аргументы вызова функции
  const args = node.getArguments().map(arg => {
    return tsTranslators.ast.expressions.parseExpression(arg as any)!;
  });

  return {
    kind: 'CallExpression',
    identifier,
    arguments_: args,
  };
}
