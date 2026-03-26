import {InterfaceDeclaration as TsInterfaceDeclaration} from "ts-morph";
import {parseIdentifier} from "../base/parse_identifier";
import {parsePropertyDeclaration} from "./parse_property_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";

export function parseInterfaceDeclaration(node: TsInterfaceDeclaration): abstracts.ast.InterfaceDeclaration {
  return {
    kind: 'InterfaceDeclaration',
    isPublic: node.isExported(),
    identifier: parseIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map(p => parsePropertyDeclaration(p)),
    description: parseDescription(node.getNameNode()),
  };
}
