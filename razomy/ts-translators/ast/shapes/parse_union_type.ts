import { UnionTypeNode } from "ts-morph";
import { parseShape } from "./parse_shape";
import * as abstracts from "@razomy/abstracts";

export function parseUnionType(node: UnionTypeNode): abstracts.translators.UnionShape {
  return {
    kind: 'UnionShape',
    shapes: node.getTypeNodes().map(t => parseShape(t)).filter(Boolean),
  };
}
