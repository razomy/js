import { UnionTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseUnion(node: UnionTypeNode): abstracts.translators.UnionShape {
  return {
    kind: 'UnionShape',
    shapes: node
      .getTypeNodes()
      .map((t) => tsLang.ast.shapes.parse(t))
      .filter(Boolean),
  };
}
