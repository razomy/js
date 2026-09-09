import { Identifier as TsIdentifier, Node } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseIdentifier(node: TsIdentifier | Node): abstracts.translators.Identifier {
  return {
    kind: 'Identifier',
    name: node.getText(),
  };
}
