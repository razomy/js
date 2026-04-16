import { ArrayTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseArray(node: ArrayTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Array',
    shapes: [tsRala.ast.shapes.parse(node.getElementTypeNode())],
  };
}
