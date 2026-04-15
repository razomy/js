import { TypeLiteralNode } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parsePropertyType} from "./parse_property_type";


export function parseObjectType(node: TypeLiteralNode): abstracts.translators.ObjectShape {
  return {
    kind: 'ObjectShape',
    properties: node.getProperties().map(p => parsePropertyType(p)),
  };
}
