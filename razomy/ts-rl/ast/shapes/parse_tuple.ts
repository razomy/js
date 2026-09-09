import { TupleTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseTuple(node: TupleTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Tuple',
    shapes: node
      .getElements()
      .map((el) => tsRl.ast.shapes.parse(el))
      .filter(Boolean),
  };
}
