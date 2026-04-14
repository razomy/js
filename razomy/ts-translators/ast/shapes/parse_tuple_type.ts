import { TupleTypeNode } from "ts-morph";
import { parseShape } from "./parse_shape";
import * as abstracts from "@razomy/abstracts";

export function parseTupleType(node: TupleTypeNode): abstracts.translators.ArrayShape {
  return {
    kind: 'ArrayShape',
    type: 'Tuple',
    shapes: node.getElements().map(el => parseShape(el)).filter(Boolean),
  };
}
