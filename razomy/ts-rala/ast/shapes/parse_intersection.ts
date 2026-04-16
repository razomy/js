import { IntersectionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseIntersection(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsLang.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
