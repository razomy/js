import {InterfaceDeclaration as TsInterfaceDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseTypeIdentifier} from "../base";
import {parsePropertyType} from "../functions";

export function parseInterfaceDeclaration(node: TsInterfaceDeclaration): abstracts.translators.InterfaceTypeBinding {
  return {
    kind: 'InterfaceTypeBinding',
    typeIdentifier: parseTypeIdentifier(node.getNameNode()),
    extends_: [], //TODO: node.getExtends().map(e => parseTypeReferenceNode(e)),
    properties: node.getProperties().map(p => parsePropertyType(p)),
    description: parseDescription(node.getNameNode()),
  };
}
