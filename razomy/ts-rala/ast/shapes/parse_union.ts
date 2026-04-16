import { UnionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseUnion(node: UnionTypeNode): abstracts.translators.UnionShape {
  return {
    kind: 'UnionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsRala.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
