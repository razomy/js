import {BreakStatement, ContinueStatement, Node} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseGo(
  node: BreakStatement | ContinueStatement
): abstracts.translators.BreakGoStatement
  | abstracts.translators.ContinueGoStatement {
  const label = node.getLabel();
  if (Node.isBreakStatement(node)) {
    return {
      kind: 'BreakGoStatement',
      labelIdentifier: {
        kind: 'Identifier',
        name: label ? label.getText() : '',
      },
    };
  }


  return {
    kind: 'ContinueGoStatement',
    labelIdentifier: {
      kind: 'Identifier',
      name: label ? label.getText() : '',
    },
  };

}

