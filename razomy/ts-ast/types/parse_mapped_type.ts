import { MappedTypeNode } from "ts-morph";
import { parseType } from "./parse_type";
import { parseIdentifier } from "../base/parse_identifier";
import * as abstracts from "@razomy/abstracts";

export function parseMappedType(node: MappedTypeNode): abstracts.ast.MappedType {
  const typeParam = node.getTypeParameter();
  return {
    kind: 'MappedType',
    identifier: parseIdentifier(typeParam.getNameNode()),
    constraint: typeParam.getConstraint() ? parseType(typeParam.getConstraint()!) as any : null as any,
    type: node.getTypeNode() ? parseType(node.getTypeNode()!) as any : null as any,
  };
}
