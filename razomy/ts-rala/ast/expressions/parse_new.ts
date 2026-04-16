import { NewExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseNew(node: NewExpression): abstracts.translators.CallExpression {
  // Получаем имя конструктора (например, "Error", "Date", "MyClass")
  const expressionNode = node.getExpression();

  // В классическом случае expressionNode это Identifier
  let identifier: abstracts.translators.Identifier | null = null;

  if (expressionNode.getKindName() === 'Identifier') {
    identifier = {
      kind: 'Identifier',
      name: expressionNode.getText(),
    };
  } else {
    // В сложных случаях, таких как `new myModules.Error()`, это будет PropertyAccessExpression.
    // Если вам нужно точное сохранение, в вашем интерфейсе CallExpression поле identifier
    // должно принимать ExpressionType. Пока что записываем как строку в Identifier.
    identifier = {
      kind: 'Identifier',
      name: expressionNode.getText(),
    };
  }

  // Получаем аргументы конструктора (например, "Age cannot be negative")
  const args = node.getArguments().map(arg => {
    // getArguments возвращает Node, но мы знаем, что это Expression
    return tsLang.ast.expressions.parse(arg as any)!;
  });

  return {
    kind: 'CallExpression',
    identifier,
    modifiers: [],
    arguments_: args,
  };
}
