import { UnionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseUnion(node: UnionTypeNode): abstracts.translators.UnionShape {
  return {
    kind: 'UnionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsRl.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
