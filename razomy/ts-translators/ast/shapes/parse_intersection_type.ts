import { IntersectionTypeNode } from "ts-morph";
import { parseShape } from "./parse_shape";
import * as abstracts from "@razomy/abstracts";

export function parseIntersectionType(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node.getTypeNodes().map(t => parseShape(t)).filter(Boolean),
  };
}
