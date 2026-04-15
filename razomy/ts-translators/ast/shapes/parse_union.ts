import { UnionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseUnion(node: UnionTypeNode): abstracts.translators.UnionShape {
  return {
    kind: 'UnionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsTranslators.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
