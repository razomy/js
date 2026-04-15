import { IntersectionTypeNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseIntersectionType(node: IntersectionTypeNode): abstracts.translators.IntersectionShape {
  return {
    kind: 'IntersectionShape',
    shapes: node.getTypeNodes().map(t => tsTranslators.ast.shapes.parseShape(t)).filter(Boolean),
  };
}
