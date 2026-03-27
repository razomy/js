import { UnionTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import * as abstracts from "@razomy/abstracts";

export function parseUnionType(node: UnionTypeNode): abstracts.translators.UnionType {
  return {
    kind: 'UnionType',
    types: node.getTypeNodes().map(t => parseType(t)).filter(Boolean),
  };
}
