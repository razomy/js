import { IntersectionTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import * as abstracts from "@razomy/abstracts";

export function parseIntersectionType(node: IntersectionTypeNode): abstracts.ast.IntersectionType {
  return {
    kind: 'IntersectionType',
    types: node.getTypeNodes().map(t => parseType(t)).filter(Boolean),
  };
}
