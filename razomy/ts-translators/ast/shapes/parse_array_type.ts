import { ArrayTypeNode } from "ts-morph";
import { parseShape } from "./parse_shape";
import * as abstracts from "@razomy/abstracts";

export function parseArrayType(node: ArrayTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Array',
    shapes: [parseShape(node.getElementTypeNode())],
  };
}
