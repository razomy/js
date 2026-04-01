import { TypeLiteralNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parsePropertyType} from "../functions";

export function parseObjectType(node: TypeLiteralNode): abstracts.translators.ObjectType {
  return {
    kind: 'ObjectType',
    properties: node.getProperties().map(p => parsePropertyType(p)),
  };
}
