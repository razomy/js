import { IntersectionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseIntersection(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsTranslators.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
