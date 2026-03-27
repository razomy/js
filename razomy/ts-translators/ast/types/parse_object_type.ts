import { TypeLiteralNode } from "ts-morph";
import { parsePropertyDeclaration } from "../declarations/parse_property_declaration";
import * as abstracts from "@razomy/abstracts";

export function parseObjectType(node: TypeLiteralNode): abstracts.translators.ObjectType {
  return {
    kind: 'ObjectType',
    properties: node.getProperties().map(p => parsePropertyDeclaration(p)) as any // TODO:,
  };
}
