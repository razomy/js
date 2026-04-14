import {InterfaceDeclaration as TsInterfaceDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";
import {parsePropertyType} from "../bindings";
import {parseShapeIdentifier} from "../shapes/parse_shape_identifier";

export function parseInterfaceDeclaration(node: TsInterfaceDeclaration): abstracts.translators.InterfaceShapeBinding {
  return {
    kind: 'InterfaceShapeBinding',
    shapeIdentifier: parseShapeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map(p => parsePropertyType(p)),
    meta: {description: parseDescription(node.getNameNode()),}
  };
}

