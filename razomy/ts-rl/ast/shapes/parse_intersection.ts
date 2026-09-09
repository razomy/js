import { IntersectionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseIntersection(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsRl.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
