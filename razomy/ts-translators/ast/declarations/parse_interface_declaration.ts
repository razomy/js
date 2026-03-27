import {InterfaceDeclaration as TsInterfaceDeclaration} from "ts-morph";
import {parsePropertyDeclaration} from "./parse_property_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseTypeIdentifier} from "../base";

export function parseInterfaceDeclaration(node: TsInterfaceDeclaration): abstracts.translators.InterfaceDeclaration {
  return {
    kind: 'InterfaceDeclaration',
    isPublic: node.isExported(),
    identifier: parseTypeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map(p => parsePropertyDeclaration(p)),
    description: parseDescription(node.getNameNode()),
  };
}
