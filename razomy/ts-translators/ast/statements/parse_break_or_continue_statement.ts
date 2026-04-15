import { BreakStatement, ContinueStatement, Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseBreakOrContinueStatement(
  node: BreakStatement | ContinueStatement
): abstracts.translators.GoStatement {
  const type = Node.isBreakStatement(node) ? 'break' : 'continue';
  const label = node.getLabel();

  return {
    kind: 'GoStatement', // Внимание: берем из вашего интерфейса, хотя логичнее было бы 'LoopBreakStatement'
    type,
    labelIdentifier: {
      kind: 'Identifier',
      name: label ? label.getText() : '', // Если нет метки (label), возвращаем пустую строку
    },
  };
}
