import { IntersectionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseIntersection(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsRala.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
