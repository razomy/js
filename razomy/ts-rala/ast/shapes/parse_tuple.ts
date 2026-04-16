import { TupleTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseTuple(node: TupleTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Tuple',
    shapes: node
      .getElements()
      .map((el) => tsRala.ast.shapes.parse(el))
      .filter(Boolean),
  };
}
