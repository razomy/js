import { ArrayTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseArray(node: ArrayTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Array',
    shapes: [tsLang.ast.shapes.parse(node.getElementTypeNode())],
  };
}
