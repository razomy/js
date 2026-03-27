import { TypeReferenceNode as TsTypeReferenceNode } from "ts-morph";
import { parseType } from "./parse_type";
import * as abstracts from "@razomy/abstracts";
import {parseTypeIdentifier} from "../base";

export function parseTypeReferenceNode(node: TsTypeReferenceNode): abstracts.translators.ReferenceType | abstracts.translators.GenericReferenceType {
  const identifier = parseTypeIdentifier(node.getTypeName());
  const typeArgs = node.getTypeArguments();

  if (typeArgs.length > 0) {
    return {
      kind: 'GenericReferenceType',
      identifier,
      types: typeArgs.map(arg => parseType(arg) as any).filter(Boolean),
    };
  }

  return {
    kind: 'ReferenceType',
    identifier,
  };
}
