import {type ParameterDeclaration, type PropertySignature} from "ts-morph";
import {parseDescription} from "../doc/parse_description";

import * as abstracts from "@razomy/abstracts";
import {parseShape} from "./index";
import {parseShapeIdentifier} from "./parse_shape_identifier";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parsePropertyType(node: PropertySignature | ParameterDeclaration): abstracts.translators.PropertyShape {
  return {
    kind: 'PropertyShape',
    shape: node.getTypeNode() ? parseShape(node.getTypeNode()!) as any : null as any,
    shapeIdentifier: parseShapeIdentifier(node.getNameNode()),
    meta: {description: parseDescription(node)!,}
  };
}
