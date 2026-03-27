import { TupleTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import * as abstracts from "@razomy/abstracts";

export function parseTupleType(node: TupleTypeNode): abstracts.translators.TupleType {
  return {
    kind: 'TupleType',
    types: node.getElements().map(el => parseType(el)).filter(Boolean),
  };
}
