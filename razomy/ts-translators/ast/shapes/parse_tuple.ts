import { TupleTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseTuple(node: TupleTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Tuple',
    shapes: node
      .getElements()
      .map((el) => tsTranslators.ast.shapes.parse(el))
      .filter(Boolean),
  };
}
