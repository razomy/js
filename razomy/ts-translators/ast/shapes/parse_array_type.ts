import { ArrayTypeNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseArrayType(node: ArrayTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Array',
    shapes: [tsTranslators.ast.shapes.parseShape(node.getElementTypeNode())],
  };
}
