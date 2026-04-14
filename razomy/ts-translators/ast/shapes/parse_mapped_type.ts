import { MappedTypeNode } from "ts-morph";
import { parseShape } from "./parse_shape";
import { parseIdentifier } from "../bindings/parse_identifier";
import * as abstracts from "@razomy/abstracts";

export function parseMappedType(node: MappedTypeNode): abstracts.translators.MappedShape {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedShape',
    identifier: parseIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint() ? parseShape(typeParam.getConstraint()!) as any : null as any,
    shape: node.getTypeNode() ? parseShape(node.getTypeNode()!) as any : null as any,
  };
}
