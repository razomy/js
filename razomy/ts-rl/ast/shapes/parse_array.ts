import { ArrayTypeNode } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseArray(node: ArrayTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Array',
    shapes: [tsRl.ast.shapes.parse(node.getElementTypeNode())],
  };
}
