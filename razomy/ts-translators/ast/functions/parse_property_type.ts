import {type PropertySignature} from "ts-morph";
import {parseDescription} from "./parse_description";

import * as abstracts from "@razomy/abstracts";
import {parseTypeIdentifier} from "../base";
import {parseType} from "../types";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parsePropertyType(node: PropertySignature): abstracts.translators.PropertyType {
  return {
    kind: 'PropertyType',
    type:  node.getTypeNode() ? parseType(node.getTypeNode()!) as any : null as any,
    typeIdentifier: parseTypeIdentifier(node.getNameNode()),
    description: parseDescription(node)!,
  };
}
