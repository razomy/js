import { ArrayTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import * as abstracts from "@razomy/abstracts";

export function parseArrayType(node: ArrayTypeNode): abstracts.ast.ArrayType {
  return {
    kind: 'ArrayType',
    type: parseType(node.getElementTypeNode()),
  };
}
