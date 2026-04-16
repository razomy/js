import { TupleTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseTuple(node: TupleTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Tuple',
    shapes: node
      .getElements()
      .map((el) => tsLang.ast.shapes.parse(el))
      .filter(Boolean),
  };
}
